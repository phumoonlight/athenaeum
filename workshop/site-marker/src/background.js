// Three jobs, all event-driven — no polling, no alarms:
//   1. colour the toolbar icon for the page in the active tab
//   2. answer the content script's "is this link marked?" lookups
//   3. tell content scripts when the store changed
//
// The content script routes every read and write through here on purpose, so
// `urlKey()` in common.js stays the single definition of "the same page".

import {
  annotateKey,
  getEntries,
  getEntriesByUrls,
  getEntry,
  siteFromUrl,
  urlKey,
} from './common.js'

// --- the toolbar icon --------------------------------------------------------
//
// The icon is the status of the page you are actually on: a filled dot in the
// same colours the on-page link dots use, so the two read as one language.
// Drawn here rather than shipped as PNGs — there are only a handful of states,
// and generating them keeps the colours in one place.

const ICON = {
  unread: { fill: '#2f6fed' },
  read: { fill: '#9aa0aa' },
  // Starred with no read state of its own.
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
  const outer = size * 0.44
  // A favourite gets an outer gold ring, so the dot inside gives up room for it.
  const radius = favorite ? outer - size * 0.14 : outer

  ctx.lineWidth = line

  // A stroke straddles its path, so a ring meant to end at `r` is drawn at
  // `r - line / 2`. Without that the outermost pixel row is clipped.
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
  } else if (style.ring) {
    ctx.beginPath()
    ctx.arc(centre, centre, radius - line / 2, 0, Math.PI * 2)
    ctx.strokeStyle = style.ring
    ctx.stroke()
  }

  return ctx.getImageData(0, 0, size, size)
}

// Six combinations in total, so draw each once and keep it.
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

/**
 * The icon carries the whole signal: the state of the page in this tab. There is
 * deliberately no badge — a count of the site's unread pages answered a question
 * nobody was asking while sitting permanently in the corner of the eye.
 */
async function paint(tabId, url, entry) {
  try {
    await chrome.action.setIcon({
      tabId,
      imageData: iconFor(entry?.status || 'none', !!entry?.favorite),
    })
    await chrome.action.setTitle({
      tabId,
      title: entry
        ? `Site Marker — this page is ${[entry.status, entry.favorite && 'favorite']
            .filter(Boolean)
            .join(', ')}`
        : 'Site Marker — this page is not marked',
    })
  } catch {
    // Tab closed mid-update.
  }
}

async function refreshTab(tabId, url) {
  // One keyed read, not the whole store — a tab only ever shows one page.
  await paint(tabId, url, siteFromUrl(url) ? await getEntry(url) : null)
}

/** The store changed — every open tab may now be stale. */
async function refreshAllTabs() {
  // Tabs the worker never gets an event for (the new tab page, a tab opened
  // before it woke) fall back to the default icon, so give it a real one rather
  // than leaving Chrome's grey puzzle piece.
  chrome.action.setIcon({ imageData: iconFor('none', false) }).catch(() => {})
  const [tabs, entries] = await Promise.all([chrome.tabs.query({}), getEntries()])
  await Promise.all(
    tabs.map((tab) =>
      paint(tab.id, tab.url, siteFromUrl(tab.url) ? entries[urlKey(tab.url)] : null)
    )
  )
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
  getEntriesByUrls(message.urls).then(
    (entries) => sendResponse(message.urls.map((url) => linkState(entries[urlKey(url)]))),
    () => sendResponse(null)
  )
  return true // keep the channel open for the async reply
})

/**
 * The on-page marker is per site, and the content script can't work out which
 * site it is on — `registrableDomain()` lives here, so that stays one
 * definition. It sends its own location and gets back the key carrying that
 * site's switch plus its current value; from then on it watches that one key
 * itself, so a toggle needs no round trip.
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type !== 'siteAnnotate') return
  const key = annotateKey(siteFromUrl(message.url || sender.tab?.url))
  if (!key) {
    sendResponse({ key: null, enabled: false })
    return
  }
  chrome.storage.local.get(key).then(
    (stored) => sendResponse({ key, enabled: !!stored[key] }),
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

// Entries live in IndexedDB, which fires no change events, so every writer
// (the popup or the manage page, through common.js) announces a successful
// write with this message instead — and sending it wakes the worker if it was
// asleep, which `chrome.storage.onChanged` used to do for free.
chrome.runtime.onMessage.addListener((message) => {
  if (message?.type !== 'entriesChanged') return
  refreshAllTabs()
  notifyTabs({ type: 'refreshMarks' }) // link dots update without a reload
})

/**
 * Folder sync used to keep two keys in storage, plus a directory handle in
 * IndexedDB — but the entry store owns that database name now, and db.js
 * clears the old handle store when it first upgrades the database, so nothing
 * is deleted here any more. `showWidget` is from the on-page marker
 * widget, also removed, and `app:readLinkOpacity` from the first read-link fade,
 * which held a 0–1 fraction. The fade is back as `app:readOpacity`, a
 * percentage, under a different name precisely so a stale `0.5` can't be read as
 * half a percent of one.
 *
 * `annotateLinks` and `app:annotateLinks` are the marker's old **global**
 * switch. It isn't renamed into the per-site keys, because a global "on" says
 * nothing about which sites you'd want it on for — every site starts off, and
 * the popup turns one on. Safe to delete this once every profile that ran those
 * builds has updated.
 */
function dropRemovedFeatureLeftovers() {
  chrome.storage.local.remove([
    'syncDirty',
    'syncMeta',
    'showWidget',
    'annotateLinks',
    'app:annotateLinks',
    'app:readLinkOpacity',
  ])
}

// The service worker is torn down when idle; re-sync whenever it wakes back up.
chrome.runtime.onStartup.addListener(refreshAllTabs)
chrome.runtime.onInstalled.addListener(() => {
  dropRemovedFeatureLeftovers()
  refreshAllTabs()
})
refreshAllTabs()
