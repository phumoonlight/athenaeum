// IndexedDB plumbing for the entry store — the only file that touches the API.
//
// Entries live here; settings stay in `chrome.storage.local`, because they are
// exactly the keys live things watch via `chrome.storage.onChanged`, and
// IndexedDB has no change events. `indexedDB` is referenced only inside
// functions, never at import time, so common.js can import this module and
// still load under node for its pure helpers.

const DB_NAME = 'site-marker'
// Version 1 of this database belonged to the removed folder-sync feature (a
// directory-handle store). Opening at 2 upgrades any leftover copy: the
// upgrade handler clears whatever stores it finds before creating ours.
const DB_VERSION = 2
const STORE = 'entries'

/**
 * The one failure callers are told about, whichever store rejected the write —
 * popup and import show its message rather than a bare rejection.
 */
export class StorageFullError extends Error {
  constructor(cause) {
    super('Out of storage space — nothing was saved.')
    this.name = 'StorageFullError'
    this.cause = cause
  }
}

// One connection per context, opened on first use and reopened after a close.
let dbPromise = null

function openDb() {
  dbPromise ??= new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = () => {
      const db = request.result
      // Anything already in this database is the folder-sync leftover.
      for (const name of [...db.objectStoreNames]) db.deleteObjectStore(name)
      const entries = db.createObjectStore(STORE)
      entries.createIndex('domain', 'domain')
      entries.createIndex('host', 'host')
      entries.createIndex('addedAt', 'addedAt')
    }
    request.onsuccess = () => {
      const db = request.result
      // Don't hold a future upgrade hostage, and reopen after any close.
      db.onversionchange = () => {
        db.close()
        dbPromise = null
      }
      db.onclose = () => {
        dbPromise = null
      }
      resolve(db)
    }
    request.onerror = () => reject(request.error)
  }).catch((error) => {
    dbPromise = null // a failed open shouldn't poison every later call
    throw error
  })
  return dbPromise
}

/** IDBRequest → promise. */
const done = (request) =>
  new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })

async function entryStore(mode) {
  return (await openDb()).transaction(STORE, mode).objectStore(STORE)
}

/** One entry by its urlKey, or undefined. */
export async function idbGet(key) {
  return done((await entryStore('readonly')).get(key))
}

/** `{ [key]: entry }` for the keys that exist — one transaction, N gets. */
export async function idbGetMany(keys) {
  const store = await entryStore('readonly')
  const values = await Promise.all(keys.map((key) => done(store.get(key))))
  const out = {}
  values.forEach((value, index) => {
    if (value !== undefined) out[keys[index]] = value
  })
  return out
}

/** The whole store as `{ [key]: entry }`. */
export async function idbGetAll() {
  const store = await entryStore('readonly')
  // Both come back in key order, so the positions correspond.
  const [keys, values] = await Promise.all([done(store.getAllKeys()), done(store.getAll())])
  const out = {}
  keys.forEach((key, index) => {
    out[key] = values[index]
  })
  return out
}

/** Every entry whose `name` index matches `value` — for per-site reads. */
export async function idbGetByIndex(name, value) {
  return done((await entryStore('readonly')).index(name).getAll(value))
}

/**
 * All writes go through here: an optional clear, then deletes, then puts, in
 * **one transaction** — a batch commits whole or not at all, so a replace
 * import can never be caught half-done. A quota failure aborts the transaction
 * and surfaces as StorageFullError, same as the settings path.
 */
export async function idbWrite({ put = {}, del = [], clear = false } = {}) {
  const db = await openDb()
  const tx = db.transaction(STORE, 'readwrite')
  const store = tx.objectStore(STORE)
  if (clear) store.clear()
  for (const key of del) store.delete(key)
  for (const [key, entry] of Object.entries(put)) store.put(entry, key)
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onabort = () => reject(new StorageFullError(tx.error))
  })
}
