// The store, plus the URL normalisation everything else agrees on.
//
// One entry per normalised page URL — Site Marker owns its data outright and
// never reads or writes browser bookmarks. Entries live in IndexedDB (db.js);
// settings stay in `chrome.storage.local`. Loaded as an ES module by the popup,
// the manage page and the service worker; the content script talks to the worker
// instead, so `urlKey()` keeps exactly one definition.

import { StorageFullError, idbGet, idbGetAll, idbGetMany, idbWrite } from './db.js'

export const CONFIG = {
  // 'domain' → pages on sub.example.com count as the same site as example.com
  // 'host'   → only exact hostname matches (www. is always ignored)
  MATCH: 'domain',
  // List order by the date a page was first marked: 'oldest' first or 'newest' first
  SORT: 'oldest',
}

/**
 * The read state, which a page has one of or neither. A **favourite** is a
 * separate flag that cuts across it: starring a page annotates it rather than
 * moving it, so a favourite is still unread or read (or neither, if you starred
 * something without saying).
 */
const STATUSES = ['unread', 'read']

/**
 * Settings go under `app:`, so every key in the storage inspector announces
 * what it is: `app:` is a knob, and anything else is left over from a build
 * that has moved on. (Marked pages used to sit alongside them as `e:` keys;
 * they live in IndexedDB now.)
 */
const SETTING_PREFIX = 'app:'

/**
 * The on-page marker is a **per-site** setting: one key per site it is on for,
 * `app:annotate:<site>`, where the site is the same identity the popup groups
 * by. A key exists only while the marker is on there, so "off on every site" —
 * the default — is simply the absence of any of them, and turning a site off
 * again leaves nothing behind rather than a store of `false`s.
 *
 * The content script can't work this key out for itself (it can't import, and
 * `registrableDomain()` is deliberately defined once), so it asks the worker
 * which key is its own and then watches that one.
 */
export const SITE_ANNOTATE_PREFIX = `${SETTING_PREFIX}annotate:`

/** How the dots look, on the other hand, is one setting for every site. */
export const MARKER_SIZE_KEY = `${SETTING_PREFIX}markerSize`
export const MARKER_OPACITY_KEY = `${SETTING_PREFIX}markerOpacity`
/**
 * Deliberately not `app:readLinkOpacity`: an earlier build of this same fade
 * used that name for a 0–1 fraction, and a leftover `0.5` read as a percentage
 * would clamp to the faintest links rather than to half. The old key is still
 * dropped as a leftover in background.js, so the two never meet.
 */
export const READ_OPACITY_KEY = `${SETTING_PREFIX}readOpacity`

/** The dot's diameter in pixels. 16 is what it was before it was adjustable. */
export const MARKER_SIZE_DEFAULT = 16
export const MARKER_SIZE_MIN = 8
export const MARKER_SIZE_MAX = 28

/**
 * How opaque the dot is, as a whole percentage rather than the 0–1 fraction CSS
 * wants: it keeps the slider and the clamp on integers, the same as the size,
 * with no float rounding on a value written every time the drag ends. 100 is
 * fully opaque, which is what the dot was before it was adjustable. The floor is
 * 10 rather than 0 — a dot you cannot see is indistinguishable from the marker
 * being off, and the toggle already covers that.
 */
export const MARKER_OPACITY_DEFAULT = 100
export const MARKER_OPACITY_MIN = 10
export const MARKER_OPACITY_MAX = 100

/**
 * How opaque a link to a page you have already read is — a percentage too, and
 * 100 means the page is left exactly as it styles its own links. The floor is 20
 * rather than 10: this fades the page's own text, not a dot of ours, and past
 * that point a link stops being readable at all.
 */
export const READ_OPACITY_DEFAULT = 100
export const READ_OPACITY_MIN = 20
export const READ_OPACITY_MAX = 100

/**
 * Anything unusable falls back to the default rather than to a dot you can't
 * see. Empty values are checked before `Number()` gets to them: it turns both
 * `null` and `''` into 0, which would otherwise clamp to the smallest dot.
 */
export function clampMarkerSize(value) {
  return clampSetting(value, MARKER_SIZE_MIN, MARKER_SIZE_MAX, MARKER_SIZE_DEFAULT)
}

/** As `clampMarkerSize()`, on the percentage. */
export function clampMarkerOpacity(value) {
  return clampSetting(value, MARKER_OPACITY_MIN, MARKER_OPACITY_MAX, MARKER_OPACITY_DEFAULT)
}

/** As `clampMarkerOpacity()`; unusable values leave read links untouched. */
export function clampReadOpacity(value) {
  return clampSetting(value, READ_OPACITY_MIN, READ_OPACITY_MAX, READ_OPACITY_DEFAULT)
}

function clampSetting(value, min, max, fallback) {
  if (value === null || value === undefined || value === '') return fallback
  const number = Number(value)
  if (!Number.isFinite(number)) return fallback
  return Math.min(max, Math.max(min, Math.round(number)))
}

/**
 * The two layouts entries lived in before IndexedDB, both in
 * `chrome.storage.local`: one `entries` blob holding everything, then one
 * `e:<urlKey>` key per page. `ensureMigrated()` moves both.
 */
const LEGACY_ENTRIES_KEY = 'entries'
const LEGACY_ENTRY_PREFIX = 'e:'

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

/**
 * What a site is called in the places that key by site — the marker's per-site
 * setting, and the popup's header. The same thing `matchesSite()` compares.
 */
export function siteKey(site) {
  return CONFIG.MATCH === 'host' ? site.host : site.domain
}

/** Does an entry belong to `site`, under the configured MATCH mode? */
function matchesSite(entry, site) {
  if (!entry || !site) return false
  return CONFIG.MATCH === 'host' ? entry.host === site.host : entry.domain === site.domain
}

// --- the on-page marker's per-site switch --------------------------------------

/**
 * The key carrying the marker's state for `site`, or null for a non-site page.
 * Takes either a site object or a site's name — the manage page lists sites it
 * only ever knew as names, and both mean the same key.
 */
export function annotateKey(site) {
  if (!site) return null
  return SITE_ANNOTATE_PREFIX + (typeof site === 'string' ? site : siteKey(site))
}

/** Is the on-page marker on here? An absent key means no — the default. */
export async function isSiteAnnotated(site) {
  const key = annotateKey(site)
  if (!key) return false
  return !!(await chrome.storage.local.get(key))[key]
}

/** Off removes the key: the store then holds exactly the sites it is on for. */
export async function setSiteAnnotated(site, on) {
  const key = annotateKey(site)
  if (!key) return
  if (on) await save({ [key]: true })
  else await chrome.storage.local.remove(key)
}

/** Every site the marker is on for, by name, for the manage page's list. */
export async function annotatedSites() {
  const all = await chrome.storage.local.get(null)
  return Object.entries(all)
    .filter(([key, value]) => key.startsWith(SITE_ANNOTATE_PREFIX) && value)
    .map(([key]) => key.slice(SITE_ANNOTATE_PREFIX.length))
    .sort()
}

// --- the store ---------------------------------------------------------------
//
// Entries live in IndexedDB (db.js), keyed by `urlKey(url)` — one record per
// marked page, so marking a page writes one record instead of rewriting the
// whole store. The `unlimitedStorage` permission covers IndexedDB's quota the
// same way it covered `chrome.storage.local`'s; what remains is the disk.
//
// A write past the quota **fails**: the transaction aborts rather than silently
// dropping data, and every rejection arrives as the same StorageFullError the
// settings path throws, so the popup and import can just show its message.

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
 * Announce an entry write to the worker, which repaints every tab's icon and
 * tells content scripts to re-check their links. `chrome.storage.onChanged`
 * used to carry this while entries lived there; IndexedDB fires no events, so
 * the writer says so itself. `sendMessage` wakes a stopped service worker —
 * the reason this is runtime messaging and not a BroadcastChannel, which
 * wouldn't. Fire and forget: a missing listener must never fail a save.
 */
function notifyEntriesChanged() {
  try {
    chrome.runtime.sendMessage({ type: 'entriesChanged' }).catch(() => {})
  } catch {
    // No runtime to tell — an orphaned page, or common.js loaded under node.
  }
}

/**
 * The canonical entry shape, from whatever an older build wrote:
 *
 *   - `status: 'favorite'` — from the build where the three states were
 *     exclusive. It becomes the flag again, with no read state, which is what a
 *     star with nothing else said always meant.
 *   - `readAt` / `favoritedAt` — per-status timestamps that nothing used;
 *     `addedAt` and `updatedAt` carry everything the UI actually reads.
 */
function normalise(entry) {
  const wasStatus = entry.status === 'favorite'
  return {
    url: entry.url,
    title: entry.title,
    host: entry.host,
    domain: entry.domain,
    status: wasStatus ? null : STATUSES.includes(entry.status) ? entry.status : null,
    favorite: wasStatus || !!entry.favorite,
    addedAt: entry.addedAt,
    updatedAt: entry.updatedAt || entry.addedAt,
  }
}

/**
 * Move entries out of `chrome.storage.local` into IndexedDB, once — folding in
 * the older shape migrations on the way (`normalise()` handles every layout
 * ever written). Both the worker and each page run their own copy of this
 * module, so two may race: `put` is last-writer-wins and both write the same
 * data, so the loser overwrites harmlessly.
 *
 * The old keys are removed **only after the IndexedDB transaction commits** —
 * a crash in between re-runs the migration next time and converges. Entries
 * can briefly exist in both stores, never in neither.
 */
let migration = null
function ensureMigrated() {
  migration ??= (async () => {
    const all = await chrome.storage.local.get(null)

    const flat = {}
    const stale = []
    const legacy = all[LEGACY_ENTRIES_KEY]
    if (legacy && typeof legacy === 'object') Object.assign(flat, legacy)
    if (legacy) stale.push(LEGACY_ENTRIES_KEY)
    // `e:` keys are the newer layout, so they win over the blob's copy.
    for (const [key, entry] of Object.entries(all)) {
      if (!key.startsWith(LEGACY_ENTRY_PREFIX)) continue
      stale.push(key)
      if (entry && typeof entry === 'object') flat[key.slice(LEGACY_ENTRY_PREFIX.length)] = entry
    }
    if (!stale.length) return

    const put = {}
    for (const [key, entry] of Object.entries(flat)) put[key] = normalise(entry)

    await idbWrite({ put })
    await chrome.storage.local.remove(stale)
  })()
  return migration
}

/** `{ [urlKey]: entry }` — an absent key means the page was never marked. */
export async function getEntries() {
  await ensureMigrated()
  return idbGetAll()
}

/** One page's entry by URL, or null — one keyed read, whatever the store's size. */
export async function getEntry(url) {
  await ensureMigrated()
  return (await idbGet(urlKey(url))) ?? null
}

/** `{ [urlKey]: entry }` for just these URLs; unmarked ones are simply absent. */
export async function getEntriesByUrls(urls) {
  await ensureMigrated()
  return idbGetMany(urls.map(urlKey))
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
    addedAt: now, // first ever marked
    updatedAt: now, // last change of any kind
  }
}

/**
 * Read, change, write back one entry — one storage key touched, whatever the
 * size of the store. An entry left with neither a read state nor a star is
 * deleted, so re-marking later starts clean rather than inheriting old dates.
 * Returns the entry, or null once it's gone.
 */
async function mutate(url, meta, apply) {
  await ensureMigrated()
  const key = urlKey(url)
  const stored = await idbGet(key)
  const now = Date.now()
  const entry = stored ? { ...stored } : newEntry(meta?.url || url, now)
  if (meta?.title) entry.title = meta.title

  apply(entry)
  entry.updatedAt = now

  if (!entry.status && !entry.favorite) {
    if (stored) {
      await idbWrite({ del: [key] })
      notifyEntriesChanged()
    }
    return null
  }
  await idbWrite({ put: { [key]: entry } })
  notifyEntriesChanged()
  return entry
}

/**
 * `status` is 'unread', 'read', or null to clear it. A starred page keeps its
 * entry with no read state — a favourite doesn't have to be one or the other.
 */
export function setStatus(url, status, meta) {
  return mutate(url, meta, (entry) => {
    entry.status = STATUSES.includes(status) ? status : null
  })
}

/** Stars cut across read state: starring never changes whether a page is read. */
export function setFavorite(url, on, meta) {
  return mutate(url, meta, (entry) => {
    entry.favorite = !!on
  })
}

/** Drop many at once — one transaction for the batch. */
export async function removeEntries(keys) {
  await ensureMigrated()
  await idbWrite({ del: keys })
  notifyEntriesChanged()
}

/**
 * Apply one change to many entries — `{ status }`, `{ favorite }`, or both — in
 * a single read and a single write, however many are selected. Same rule as a
 * single mark: an entry left with neither a read state nor a star is deleted.
 *
 * Keys that no longer exist are skipped rather than resurrected, so a stale
 * selection can't recreate something deleted in another tab.
 */
export async function updateEntries(keys, changes) {
  await ensureMigrated()
  const found = await idbGetMany(keys)
  const now = Date.now()
  const patch = {}
  const gone = []

  for (const [key, stored] of Object.entries(found)) {
    const entry = { ...stored, updatedAt: now }
    if (changes.status !== undefined) entry.status = changes.status
    if (changes.favorite !== undefined) entry.favorite = changes.favorite
    if (!entry.status && !entry.favorite) gone.push(key)
    else patch[key] = entry
  }

  if (gone.length || Object.keys(patch).length) {
    await idbWrite({ put: patch, del: gone })
    notifyEntriesChanged()
  }
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
// Fields are written in a fixed order, and `favorite` is left out when it is
// false — a `"favorite": false` on every line is noise in every diff.

const ENTRY_FIELDS = ['url', 'title', 'status', 'favorite', 'addedAt']

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

/**
 * On-disk shape → internal entry, or null if it isn't usable. A file from the
 * build where the three states were exclusive carries `status: 'favorite'`;
 * that becomes the flag again, with no read state.
 */
function entryIn(raw) {
  if (!raw || typeof raw.url !== 'string') return null
  const site = siteFromUrl(raw.url)
  if (!site) return null

  const wasStatus = raw.status === 'favorite'
  const status = wasStatus ? null : STATUSES.includes(raw.status) ? raw.status : null
  const favorite = wasStatus || !!raw.favorite
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
    updatedAt: ms(raw.updatedAt) || ms(raw.favoritedAt) || ms(raw.readAt) || addedAt,
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
// 1 was one JSON object; 2 added NDJSON; 3 briefly made favourite a status; 4
// put it back to a flag alongside the read state.
const SUPPORTED_VERSIONS = [1, 2, 3, 4]
const EXPORT_VERSION = 4

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
 * Throws with a readable message rather than guessing at an unknown shape. Another
 * tool's export is not accepted, however close it looks: quietly guessing at
 * someone else's format is how you import nonsense.
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
  if (!SUPPORTED_VERSIONS.includes(header.version)) {
    throw new Error(
      `Unsupported export version ${header.version} — this build reads ` +
        `${SUPPORTED_VERSIONS.join(', ')}.`
    )
  }
}

/**
 * Merge incoming entries into the store, newest `updatedAt` winning per URL.
 * `replace` wipes the store first — the clear and the puts are one
 * transaction, so a replace commits whole or not at all rather than being
 * caught between the remove and the write.
 */
export async function applyEntries(incoming, { replace = false } = {}) {
  await ensureMigrated()
  const current = await getEntries()
  const result = { added: 0, updated: 0, unchanged: 0, removed: 0 }
  const patch = {}

  if (replace) result.removed = Object.keys(current).length

  for (const entry of incoming) {
    const key = urlKey(entry.url)
    const existing = replace ? undefined : current[key]
    if (!existing) {
      patch[key] = entry
      result.added++
    } else if ((entry.updatedAt || 0) > (existing.updatedAt || 0)) {
      patch[key] = { ...entry, addedAt: Math.min(existing.addedAt, entry.addedAt) }
      result.updated++
    } else {
      result.unchanged++
    }
  }

  if (replace || Object.keys(patch).length) {
    await idbWrite({ clear: replace, put: patch })
    notifyEntriesChanged()
  }
  return result
}

export function faviconUrl(pageUrl, size = 32) {
  const url = new URL(chrome.runtime.getURL('/_favicon/'))
  url.searchParams.set('pageUrl', pageUrl)
  url.searchParams.set('size', String(size))
  return url.toString()
}
