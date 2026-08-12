// The store, plus the URL normalisation everything else agrees on.
//
// One entry per normalised page URL — Site Marker owns its data outright and
// never reads or writes browser bookmarks. Loaded as an ES module by the popup,
// the manage page and the service worker; the content script talks to the worker
// instead, so `urlKey()` keeps exactly one definition.

export const CONFIG = {
  // 'domain' → pages on sub.example.com count as the same site as example.com
  // 'host'   → only exact hostname matches (www. is always ignored)
  MATCH: 'domain',
  // List order by the date a page was first marked: 'oldest' first or 'newest' first
  SORT: 'oldest',
}

/**
 * Each entry is its own storage key, `e:<urlKey>`. One key per page rather than
 * one big map: marking a page then writes ~200 bytes instead of rewriting the
 * entire store, which is what matters once there are thousands of them.
 */
export const ENTRY_PREFIX = 'e:'

/** The pre-`e:` layout, split out on first load and then deleted. */
const LEGACY_ENTRIES_KEY = 'entries'

/** The content script's toggle. Mirrored literally in marker.js — it can't import. */
export const ANNOTATE_KEY = 'annotateLinks'

// Hostnames whose "domain" is really the whole host — a two-label suffix list is
// enough for personal use; anything not listed falls back to the last two labels.
const TWO_LABEL_SUFFIXES = [
  'co.uk',
  'co.jp',
  'co.kr',
  'co.th',
  'co.id',
  'co.nz',
  'co.in',
  'com.au',
  'com.br',
  'com.cn',
  'com.mx',
  'com.tr',
  'com.tw',
  'or.th',
  'ac.th',
  'go.th',
  'ne.jp',
  'or.jp',
]

/** Strip a leading `www.` — it is never meaningful for matching. */
function stripWww(host) {
  return host.replace(/^www\./i, '')
}

/** `sub.example.co.uk` → `example.co.uk` */
function registrableDomain(host) {
  const parts = host.split('.')
  if (parts.length <= 2) return host
  const lastTwo = parts.slice(-2).join('.')
  const size = TWO_LABEL_SUFFIXES.includes(lastTwo) ? 3 : 2
  return parts.slice(-size).join('.')
}

/**
 * The site identity of a URL, or null for anything that has no site
 * (brave://, chrome://, file://, about:blank, the new tab page…).
 */
export function siteFromUrl(url) {
  if (!url) return null
  let parsed
  try {
    parsed = new URL(url)
  } catch {
    return null
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null
  const host = stripWww(parsed.hostname)
  if (!host) return null
  return { host, domain: registrableDomain(host) }
}

/**
 * A URL reduced to what should count as "the same page": fragment dropped,
 * `www.` and a trailing slash ignored, host lower-cased. The query string still
 * counts, and the path keeps its case — some sites are case-sensitive there.
 *
 * This is the storage key, so changing it invalidates existing marks.
 */
export function urlKey(url) {
  try {
    const u = new URL(url)
    const host = stripWww(u.hostname).toLowerCase()
    const path = u.pathname.replace(/\/$/, '')
    return `${u.protocol}//${host}${path}${u.search}`
  } catch {
    return String(url).trim()
  }
}

/** Does an entry belong to `site`, under the configured MATCH mode? */
function matchesSite(entry, site) {
  if (!entry || !site) return false
  return CONFIG.MATCH === 'host' ? entry.host === site.host : entry.domain === site.domain
}

// --- the store ---------------------------------------------------------------
//
// Quota: `chrome.storage.local` allows 10 MB by default (5 MB on Chrome 113 and
// earlier), counted as the JSON of every value plus the length of every key. An
// entry runs around 350 bytes, so the default would hold roughly 29,000 marked
// pages — but the store only ever grows, so the manifest asks for
// `unlimitedStorage` and lifts the cap entirely. What remains is the disk.
//
// A write past the quota **fails**: `set()` rejects rather than silently
// dropping data. `save()` exists so that failure arrives as one recognisable
// error instead of a bare rejection from wherever it happened.

const storageKey = (url) => ENTRY_PREFIX + urlKey(url)

class StorageFullError extends Error {
  constructor(cause) {
    super('Out of storage space — nothing was saved.')
    this.name = 'StorageFullError'
    this.cause = cause
  }
}

async function save(patch) {
  try {
    await chrome.storage.local.set(patch)
  } catch (error) {
    // The only documented failure is exceeding the quota; treat anything else
    // the same way, since the outcome for the caller is identical.
    throw new StorageFullError(error)
  }
}

/**
 * Move a pre-`e:` store to one key per entry, once. Both the worker and each
 * page run their own copy of this module, so two may race — the work is
 * idempotent, so the loser simply finds nothing left to move.
 */
let migration = null
function ensureMigrated() {
  migration ??= (async () => {
    const stored = await chrome.storage.local.get(LEGACY_ENTRIES_KEY)
    const legacy = stored[LEGACY_ENTRIES_KEY]
    if (!legacy || typeof legacy !== 'object') return
    const patch = {}
    for (const [key, entry] of Object.entries(legacy)) patch[ENTRY_PREFIX + key] = entry
    if (Object.keys(patch).length) await save(patch)
    await chrome.storage.local.remove(LEGACY_ENTRIES_KEY)
  })()
  return migration
}

/** `{ [urlKey]: entry }` — an absent key means the page was never marked. */
export async function getEntries() {
  await ensureMigrated()
  const all = await chrome.storage.local.get(null)
  const out = {}
  for (const [key, value] of Object.entries(all)) {
    if (key.startsWith(ENTRY_PREFIX)) out[key.slice(ENTRY_PREFIX.length)] = value
  }
  return out
}

function newEntry(url, now) {
  const site = siteFromUrl(url)
  return {
    url,
    title: url,
    host: site?.host || '',
    domain: site?.domain || '',
    status: null,
    favorite: false,
    addedAt: now,
    readAt: null,
    favoritedAt: null,
    updatedAt: now,
  }
}

/**
 * Read, change, write back one entry — one storage key touched, whatever the
 * size of the store. An entry that ends up with neither a status nor a star is
 * deleted, so re-marking later starts clean rather than inheriting old dates.
 */
async function mutate(url, meta, apply) {
  await ensureMigrated()
  const key = storageKey(url)
  const stored = (await chrome.storage.local.get(key))[key]
  const now = Date.now()
  const entry = stored ? { ...stored } : newEntry(meta?.url || url, now)
  if (meta?.title) entry.title = meta.title

  apply(entry, now)
  entry.updatedAt = now

  const gone = !entry.status && !entry.favorite
  if (gone) await chrome.storage.local.remove(key)
  else await save({ [key]: entry })
  return gone ? null : entry
}

/**
 * `status` is 'unread', 'read', or null to clear it. Clearing the status of a
 * starred page keeps the entry — a favourite doesn't have to have a read state.
 */
export function setStatus(url, status, meta) {
  return mutate(url, meta, (entry, now) => {
    entry.status = status
    entry.readAt = status === 'read' ? now : null
  })
}

/** Stars cut across read state: starring never changes whether a page is read. */
export function setFavorite(url, on, meta) {
  return mutate(url, meta, (entry, now) => {
    entry.favorite = on
    entry.favoritedAt = on ? now : null
  })
}

/** Drop many at once — one storage call for the batch. */
export async function removeEntries(keys) {
  await ensureMigrated()
  await chrome.storage.local.remove(keys.map((key) => ENTRY_PREFIX + key))
}

/**
 * Apply one change to many entries — `{ status }`, `{ favorite }`, or both — in
 * a single read and a single write, however many are selected. Same rule as a
 * single mark: an entry left with neither a status nor a star is deleted.
 *
 * Keys that no longer exist are skipped rather than resurrected, so a stale
 * selection can't recreate something deleted in another tab.
 */
export async function updateEntries(keys, changes) {
  await ensureMigrated()
  const found = await chrome.storage.local.get(keys.map((key) => ENTRY_PREFIX + key))
  const now = Date.now()
  const patch = {}
  const gone = []

  for (const [storageKey, stored] of Object.entries(found)) {
    const entry = { ...stored }
    if (changes.status !== undefined) {
      entry.status = changes.status
      entry.readAt = changes.status === 'read' ? now : null
    }
    if (changes.favorite !== undefined) {
      entry.favorite = changes.favorite
      entry.favoritedAt = changes.favorite ? now : null
    }
    entry.updatedAt = now
    if (!entry.status && !entry.favorite) gone.push(storageKey)
    else patch[storageKey] = entry
  }

  if (gone.length) await chrome.storage.local.remove(gone)
  if (Object.keys(patch).length) await save(patch)
  return { changed: Object.keys(patch).length, removed: gone.length }
}

/** One site's entries, in CONFIG.SORT order (oldest marked first by default). */
export function entriesForSite(entries, site) {
  const direction = CONFIG.SORT === 'newest' ? -1 : 1
  return Object.values(entries)
    .filter((entry) => matchesSite(entry, site))
    .sort((a, b) => direction * (a.addedAt - b.addedAt))
}

/** Unread / read / favorite. Favourites overlap the other two by design. */
export function partition(list) {
  return {
    unread: list.filter((entry) => entry.status === 'unread'),
    read: list.filter((entry) => entry.status === 'read'),
    favorite: list.filter((entry) => entry.favorite),
  }
}

// --- serialisation -----------------------------------------------------------
//
// Export files are NDJSON: one entry per line, sorted by storage key. That
// shape is chosen for git — an export committed to a repo diffs a line at a
// time, so a new page is a one-line insertion that leaves its neighbours
// untouched rather than a reshuffled array.
//
// Fields are written in a fixed order, and anything empty is left out entirely:
// a `"favorite": false` on every line is noise in every diff.

const ENTRY_FIELDS = ['url', 'title', 'status', 'favorite', 'addedAt', 'readAt', 'favoritedAt']

const iso = (ms) => (ms ? new Date(ms).toISOString() : null)
const ms = (value) => {
  if (!value) return null
  const parsed = typeof value === 'number' ? value : Date.parse(value)
  return Number.isFinite(parsed) ? parsed : null
}

/** Internal entry → the on-disk shape, timestamps as ISO strings. */
function entryOut(entry) {
  const out = {}
  for (const field of ENTRY_FIELDS) {
    const value = field.endsWith('At') ? iso(entry[field]) : entry[field]
    // `url`, `title` and `addedAt` always survive; the rest only when meaningful.
    if (value === null || value === undefined || value === false) continue
    out[field] = value
  }
  out.updatedAt = iso(entry.updatedAt || entry.addedAt)
  return out
}

/** On-disk shape → internal entry, or null if it isn't usable. */
function entryIn(raw) {
  if (!raw || typeof raw.url !== 'string') return null
  const site = siteFromUrl(raw.url)
  if (!site) return null
  const status = raw.status === 'read' || raw.status === 'unread' ? raw.status : null
  const favorite = !!raw.favorite
  if (!status && !favorite) return null
  const addedAt = ms(raw.addedAt) || Date.now()
  return {
    url: raw.url,
    title: typeof raw.title === 'string' && raw.title ? raw.title : raw.url,
    host: site.host,
    domain: site.domain,
    status,
    favorite,
    addedAt,
    readAt: status === 'read' ? ms(raw.readAt) || addedAt : null,
    favoritedAt: favorite ? ms(raw.favoritedAt) || addedAt : null,
    updatedAt: ms(raw.updatedAt) || ms(raw.readAt) || addedAt,
  }
}

/** Entries sorted by their storage key — the stable order files are written in. */
export function sortedEntries(entries) {
  return Object.entries(entries)
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([, entry]) => entry)
}

export function counts(list) {
  const groups = partition(list)
  return {
    sites: new Set(list.map((entry) => entry.domain)).size,
    total: list.length,
    unread: groups.unread.length,
    read: groups.read.length,
    favorite: groups.favorite.length,
  }
}

const EXPORT_FORMAT = 'site-marker'
const EXPORT_VERSION = 2

/** NDJSON, with a trailing newline so the last line is a proper line. */
const toNdjson = (records) => records.map((r) => JSON.stringify(r)).join('\n') + '\n'

/** Lines → objects, skipping blanks. Throws on the first line that isn't JSON. */
function fromNdjson(text) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      try {
        return JSON.parse(line)
      } catch {
        throw new Error(`Line ${index + 1} isn't valid JSON.`)
      }
    })
}

/**
 * The whole store as one export file: a header line describing the file, then
 * one line per entry.
 */
export function exportText(entries) {
  const list = sortedEntries(entries)
  const header = {
    format: EXPORT_FORMAT,
    version: EXPORT_VERSION,
    exportedAt: new Date().toISOString(),
    counts: counts(list),
  }
  return toNdjson([header, ...list.map(entryOut)])
}

/**
 * Validate an import file and return its entries. Three shapes are accepted:
 *
 *   - the current NDJSON export: a header line, then one entry per line
 *   - **headerless NDJSON**: nothing but entry lines. This is what the shard
 *     files written by the old folder-sync feature look like, so those can be
 *     dragged straight in rather than being stranded
 *   - a version 1 export: one whole JSON object holding an `entries` array
 *
 * Throws with a readable message rather than guessing at an unknown shape —
 * Bookmark Plus exports are a different format and are not accepted.
 */
export function parseExport(text) {
  const trimmed = text.trim()
  if (!trimmed) throw new Error('That file is empty.')

  // Version 1 is the only shape that is one whole JSON object with an entries
  // array; a one-line NDJSON file also parses whole, so check for the array.
  let whole = null
  try {
    whole = JSON.parse(trimmed)
  } catch {
    // More than one line — it can only be NDJSON.
  }
  if (whole && typeof whole === 'object' && Array.isArray(whole.entries)) {
    checkHeader(whole)
    return whole.entries.map(entryIn).filter(Boolean)
  }

  const records = fromNdjson(trimmed)
  const headed = !!records[0]?.format
  if (headed) checkHeader(records[0])

  const entries = (headed ? records.slice(1) : records).map(entryIn).filter(Boolean)
  // A headed file may legitimately be empty; a headerless one that yielded
  // nothing is simply not ours.
  if (!headed && !entries.length) {
    throw new Error('Not a Site Marker file — there are no marked pages in it.')
  }
  return entries
}

function checkHeader(header) {
  if (header?.format !== EXPORT_FORMAT) {
    throw new Error('Not a Site Marker export file — the first line must be its header.')
  }
  if (header.version !== EXPORT_VERSION && header.version !== 1) {
    throw new Error(`Unsupported export version ${header.version} — this build reads 1 and 2.`)
  }
}

/**
 * Merge incoming entries into the store, newest `updatedAt` winning per URL.
 * `replace` wipes the store first. One storage write for the whole batch.
 */
export async function applyEntries(incoming, { replace = false } = {}) {
  await ensureMigrated()
  const current = await getEntries()
  const result = { added: 0, updated: 0, unchanged: 0, removed: 0 }
  const patch = {}

  if (replace) {
    const stale = Object.keys(current).map((key) => ENTRY_PREFIX + key)
    if (stale.length) await chrome.storage.local.remove(stale)
    result.removed = stale.length
  }

  for (const entry of incoming) {
    const key = urlKey(entry.url)
    const existing = replace ? undefined : current[key]
    if (!existing) {
      patch[ENTRY_PREFIX + key] = entry
      result.added++
    } else if ((entry.updatedAt || 0) > (existing.updatedAt || 0)) {
      patch[ENTRY_PREFIX + key] = { ...entry, addedAt: Math.min(existing.addedAt, entry.addedAt) }
      result.updated++
    } else {
      result.unchanged++
    }
  }

  if (Object.keys(patch).length) await save(patch)
  return result
}

export function faviconUrl(pageUrl, size = 32) {
  const url = new URL(chrome.runtime.getURL('/_favicon/'))
  url.searchParams.set('pageUrl', pageUrl)
  url.searchParams.set('size', String(size))
  return url.toString()
}
