// Three jobs, all event-driven — no polling, no alarms:
//   1. colour the toolbar icon for the page in the active tab
//   2. answer the content script's "is this link marked?" lookups
//   3. tell content scripts when the store changed
//
// The content script routes every read and write through here on purpose, so
// `urlKey()` in common.js stays the single definition of "the same page".

import { ENTRY_PREFIX, getEntries, siteFromUrl, urlKey } from './common.js'

// --- the toolbar icon --------------------------------------------------------
//
// The icon is the status of the page you are actually on: a filled dot in the
// same colours the on-page link dots use, so the two read as one language.
// Drawn here rather than shipped as PNGs — there are only a handful of states,
// and generating them keeps the colours in one place.

const ICON = {
  unread: { fill: '#2f6fed' },
  read: { fill: '#9aa0aa' },
  // Marked as a favourite with no read state of its own.
  marked: { fill: '#ffffff' },
  // Never marked: a hollow ring, quiet enough to ignore.
  none: { fill: null, ring: '#8b9099' },
}

const FAVORITE_RING = '#f0bb45'
const SIZES = [16, 32]

/** One ImageData per size, for a given page state. */
function drawIcon(size, status, favorite) {
  const canvas = new OffscreenCanvas(size, size)
  const ctx = canvas.getContext('2d')
  const style = ICON[status] || ICON.none
  const centre = size / 2
  const line = size * 0.12
  // A stroke straddles its path, so a ring meant to end at `r` is drawn at
  // `r - line / 2`. Without that the outermost pixel row gets clipped.
  const outer = size * 0.44
  // A favourite gets an outer gold ring, so the dot inside has to give up room.
  const radius = favorite ? outer - size * 0.14 : outer

  ctx.lineWidth = line

  if (favorite) {
    ctx.beginPath()
    ctx.arc(centre, centre, outer - line / 2, 0, Math.PI * 2)
    ctx.strokeStyle = FAVORITE_RING
    ctx.stroke()
  }

  if (style.fill) {
    ctx.beginPath()
    ctx.arc(centre, centre, radius, 0, Math.PI * 2)
    ctx.fillStyle = style.fill
    ctx.fill()
  }
  if (style.ring) {
    ctx.beginPath()
    ctx.arc(centre, centre, radius - line / 2, 0, Math.PI * 2)
    ctx.strokeStyle = style.ring
    ctx.stroke()
  }

  return ctx.getImageData(0, 0, size, size)
}

// Six states in total, so draw each once and keep it.
const iconCache = new Map()

function iconFor(status, favorite) {
  const key = `${status}:${favorite}`
  if (!iconCache.has(key)) {
    const imageData = {}
    for (const size of SIZES) imageData[size] = drawIcon(size, status, favorite)
    iconCache.set(key, imageData)
  }
  return iconCache.get(key)
}

/** The page's own state — not the site's. `null` when it was never marked. */
function pageStatus(entry) {
  if (!entry) return 'none'
  return entry.status || 'marked'
}

/**
 * The icon carries the whole signal: the state of the page in this tab. There is
 * deliberately no badge — a count of the site's unread pages answered a question
 * nobody was asking while sitting permanently in the corner of the eye.
 */
async function paint(tabId, url, entries) {
  const entry = siteFromUrl(url) ? entries[urlKey(url)] : null
  try {
    await chrome.action.setIcon({ tabId, imageData: iconFor(pageStatus(entry), !!entry?.favorite) })
    await chrome.action.setTitle({
      tabId,
      title: entry
        ? `Site Marker — this page is ${entry.status || 'marked'}${entry.favorite ? ', favorite' : ''}`
        : 'Site Marker — this page is not marked',
    })
  } catch {
    // Tab closed mid-update.
  }
}

async function refreshTab(tabId, url) {
  await paint(tabId, url, await getEntries())
}

/** The store changed — every open tab may now be stale. */
async function refreshAllTabs() {
  // Tabs the worker never gets an event for (the new tab page, a tab opened
  // before it woke) fall back to the default icon, so give it a real one rather
  // than leaving Chrome's grey puzzle piece.
  chrome.action.setIcon({ imageData: iconFor('none', false) }).catch(() => {})
  const [tabs, entries] = await Promise.all([chrome.tabs.query({}), getEntries()])
  await Promise.all(tabs.map((tab) => paint(tab.id, tab.url, entries)))
}

/** Tell content scripts to re-evaluate. Tabs without one just reject. */
function notifyTabs(message) {
  chrome.tabs.query({}).then((tabs) => {
    for (const tab of tabs) chrome.tabs.sendMessage(tab.id, message).catch(() => {})
  })
}

/** What a link's dot should show, or null for a page that was never marked. */
function linkState(entry) {
  if (!entry) return null
  return { status: entry.status, favorite: !!entry.favorite }
}

// The content script only ever reads. Marking is the popup's job, so nothing on
// a page can change a status — least of all a stray click.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type !== 'checkLinks' || !Array.isArray(message.urls)) return
  getEntries().then(
    (entries) => sendResponse(message.urls.map((url) => linkState(entries[urlKey(url)]))),
    () => sendResponse(null)
  )
  return true // keep the channel open for the async reply
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // `changeInfo.url` also covers an SPA route change, where the document never
  // reloads but the icon is now describing a page you have left.
  if (changeInfo.url || changeInfo.status === 'complete') refreshTab(tabId, tab.url)
})

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const tab = await chrome.tabs.get(tabId).catch(() => null)
  if (tab) refreshTab(tabId, tab.url)
})

chrome.storage.onChanged.addListener((changes, area) => {
  // Entries are one key each, so watch the prefix rather than a single key.
  if (area !== 'local') return
  if (!Object.keys(changes).some((key) => key.startsWith(ENTRY_PREFIX))) return
  refreshAllTabs()
  notifyTabs({ type: 'refreshMarks' }) // link dots update without a reload
})

/**
 * Folder sync used to keep a directory handle in IndexedDB and two keys in
 * storage. The handle is a live reference to a folder on disk, so it is worth
 * dropping rather than leaving orphaned. `showWidget` is from the on-page marker
 * widget, also removed. Safe to delete this once every profile that ran those
 * builds has updated.
 */
function dropRemovedFeatureLeftovers() {
  chrome.storage.local.remove(['syncDirty', 'syncMeta', 'showWidget'])
  indexedDB.deleteDatabase('site-marker')
}

// The service worker is torn down when idle; re-sync whenever it wakes back up.
chrome.runtime.onStartup.addListener(refreshAllTabs)
chrome.runtime.onInstalled.addListener(() => {
  dropRemovedFeatureLeftovers()
  refreshAllTabs()
})
refreshAllTabs()
