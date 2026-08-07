// Shared logic between the popup and the background service worker.
// Both load this as an ES module, so there is no build step.

export const CONFIG = {
  // 'domain' → bookmarks on sub.example.com show up while on example.com (and vice versa)
  // 'host'   → only exact hostname matches (www. is always ignored)
  MATCH: 'domain',
  // List order by the date the bookmark was saved: 'oldest' first or 'newest' first
  SORT: 'oldest',
  // Where "+ Add" saves: 'bar' → the bookmarks bar, 'default' → the browser's
  // default folder (Other bookmarks)
  ADD_TO: 'bar',
  // Mark a bookmark read automatically when you open it from the popup
  MARK_READ_ON_OPEN: false,
  BADGE_COLOR: '#2f6fed',
}

const READ_KEY = 'readIds'

/** Whether the content script marks bookmarked links on pages. Mirrored literally in content.js. */
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
export function registrableDomain(host) {
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

/** Does a bookmark URL belong to `site`, under the configured MATCH mode? */
export function matchesSite(bookmarkUrl, site) {
  const other = siteFromUrl(bookmarkUrl)
  if (!other || !site) return false
  return CONFIG.MATCH === 'host' ? other.host === site.host : other.domain === site.domain
}

/**
 * Every bookmark in the tree as a flat list, each carrying the folder path it
 * lives in (e.g. `Bookmarks bar / Reading`). Folders themselves are skipped.
 */
export async function getAllBookmarks() {
  const tree = await chrome.bookmarks.getTree()
  const out = []
  const walk = (nodes, path) => {
    for (const node of nodes) {
      if (node.url) {
        out.push({
          id: node.id,
          title: node.title || node.url,
          url: node.url,
          dateAdded: node.dateAdded || 0,
          folder: path.join(' / '),
        })
      } else if (node.children) {
        // The root node has an empty title; don't put it in the path.
        walk(node.children, node.title ? [...path, node.title] : path)
      }
    }
  }
  walk(tree, [])
  return out
}

/**
 * Folder new bookmarks go into, or undefined to let the browser pick its default.
 * The bookmarks bar is id '1' in Chromium; the first root child is the fallback
 * in case that ever stops holding.
 */
export async function addFolderId() {
  if (CONFIG.ADD_TO !== 'bar') return undefined
  const [root] = await chrome.bookmarks.getTree()
  const children = root?.children || []
  const bar = children.find((node) => node.id === '1') || children[0]
  return bar?.id
}

/** Bookmarks for one site, in CONFIG.SORT order (oldest saved first by default). */
export function filterBySite(bookmarks, site) {
  const direction = CONFIG.SORT === 'newest' ? -1 : 1
  return bookmarks
    .filter((b) => matchesSite(b.url, site))
    .sort((a, b) => direction * (a.dateAdded - b.dateAdded))
}

/** `{ [bookmarkId]: markedAtMs }` — absence means unread. */
export async function getReadIds() {
  const stored = await chrome.storage.local.get(READ_KEY)
  return stored[READ_KEY] || {}
}

export async function setRead(id, read) {
  const map = await getReadIds()
  if (read) map[id] = Date.now()
  else delete map[id]
  await chrome.storage.local.set({ [READ_KEY]: map })
  return map
}

/**
 * Apply many marks at once: `{ [bookmarkId]: markedAtMs | null }`, where null
 * clears the mark. One storage write for the whole batch — used by import.
 */
export async function applyReadMarks(marks) {
  const map = await getReadIds()
  for (const [id, at] of Object.entries(marks)) {
    if (at) map[id] = at
    else delete map[id]
  }
  await chrome.storage.local.set({ [READ_KEY]: map })
  return map
}

/**
 * A URL reduced to what should count as "the same bookmark" across profiles:
 * fragment dropped, `www.` and a trailing slash ignored, host lower-cased.
 * The path keeps its case — some sites are case-sensitive there.
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
 * Drop read marks for bookmarks that no longer exist, so deleting and
 * re-adding a bookmark brings it back as unread instead of silently read.
 */
export async function pruneReadIds(bookmarks) {
  const map = await getReadIds()
  const alive = new Set(bookmarks.map((b) => b.id))
  const stale = Object.keys(map).filter((id) => !alive.has(id))
  if (!stale.length) return map
  for (const id of stale) delete map[id]
  await chrome.storage.local.set({ [READ_KEY]: map })
  return map
}

export function faviconUrl(pageUrl, size = 32) {
  const url = new URL(chrome.runtime.getURL('/_favicon/'))
  url.searchParams.set('pageUrl', pageUrl)
  url.searchParams.set('size', String(size))
  return url.toString()
}
