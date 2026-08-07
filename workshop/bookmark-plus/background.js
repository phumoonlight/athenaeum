// Two jobs, both event-driven — no polling, no alarms:
//   1. keep the toolbar badge showing the unread count for each tab's site
//   2. answer the content script's "are any of these links bookmarked?" queries

import { CONFIG, getAllBookmarks, getReadIds, filterBySite, siteFromUrl, urlKey } from './common.js'

async function unreadCountFor(url, bookmarks, readIds) {
  const site = siteFromUrl(url)
  if (!site) return 0
  return filterBySite(bookmarks, site).filter((b) => !readIds[b.id]).length
}

async function setBadge(tabId, count) {
  try {
    await chrome.action.setBadgeText({ tabId, text: count ? String(count) : '' })
    if (count) {
      await chrome.action.setBadgeBackgroundColor({ tabId, color: CONFIG.BADGE_COLOR })
      // Not supported on every Chromium build; harmless if it throws.
      await chrome.action.setBadgeTextColor?.({ tabId, color: '#ffffff' })
    }
  } catch {
    // Tab closed mid-update.
  }
}

async function refreshTab(tabId, url) {
  const [bookmarks, readIds] = await Promise.all([getAllBookmarks(), getReadIds()])
  await setBadge(tabId, await unreadCountFor(url, bookmarks, readIds))
}

/** Bookmarks or read marks changed — every open tab may now be stale. */
async function refreshAllTabs() {
  const [tabs, bookmarks, readIds] = await Promise.all([
    chrome.tabs.query({}),
    getAllBookmarks(),
    getReadIds(),
  ])
  await Promise.all(
    tabs.map(async (tab) => setBadge(tab.id, await unreadCountFor(tab.url, bookmarks, readIds)))
  )
}

// Normalised URL → bookmark id, held only for as long as the worker lives.
let keyCache = null

async function bookmarkKeys() {
  if (!keyCache) {
    const bookmarks = await getAllBookmarks()
    keyCache = new Map(bookmarks.map((b) => [urlKey(b.url), b.id]))
  }
  return keyCache
}

/** Tell content scripts to re-evaluate their links. Tabs without one just reject. */
async function notifyTabs() {
  const tabs = await chrome.tabs.query({})
  for (const tab of tabs) {
    chrome.tabs.sendMessage(tab.id, { type: 'refreshMarks' }).catch(() => {})
  }
}

function onBookmarksChanged() {
  keyCache = null
  refreshAllTabs()
  notifyTabs()
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type !== 'checkLinks' || !Array.isArray(message.urls)) return
  Promise.all([bookmarkKeys(), getReadIds()]).then(([keys, readIds]) => {
    sendResponse(
      message.urls.map((url) => {
        const id = keys.get(urlKey(url))
        if (id === undefined) return null // not bookmarked — no dot
        return readIds[id] ? 'read' : 'unread'
      })
    )
  })
  return true // keep the channel open for the async reply
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url || changeInfo.status === 'complete') refreshTab(tabId, tab.url)
})

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const tab = await chrome.tabs.get(tabId).catch(() => null)
  if (tab) refreshTab(tabId, tab.url)
})

chrome.bookmarks.onCreated.addListener(onBookmarksChanged)
chrome.bookmarks.onRemoved.addListener(onBookmarksChanged)
chrome.bookmarks.onChanged.addListener(onBookmarksChanged)
chrome.bookmarks.onMoved.addListener(onBookmarksChanged)

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local' || !changes.readIds) return
  refreshAllTabs()
  notifyTabs() // dots on open pages switch blue ↔ grey
})

// The service worker is torn down when idle; re-sync whenever it wakes back up.
chrome.runtime.onStartup.addListener(refreshAllTabs)
chrome.runtime.onInstalled.addListener(refreshAllTabs)
refreshAllTabs()
