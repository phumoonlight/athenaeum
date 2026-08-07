import {
  addFolderId,
  ANNOTATE_KEY,
  CONFIG,
  faviconUrl,
  filterBySite,
  getAllBookmarks,
  pruneReadIds,
  setRead,
  siteFromUrl,
  urlKey,
} from './common.js'
import { icon, setIcon } from './icons.js'

const el = {
  favicon: document.getElementById('favicon'),
  site: document.getElementById('site'),
  scope: document.getElementById('scope'),
  tabs: document.getElementById('tabs'),
  countUnread: document.getElementById('count-unread'),
  countRead: document.getElementById('count-read'),
  list: document.getElementById('list'),
  empty: document.getElementById('empty'),
  export: document.getElementById('export'),
  import: document.getElementById('import'),
  annotate: document.getElementById('annotate'),
  current: document.getElementById('current'),
  currentDot: document.getElementById('current-dot'),
  currentTitle: document.getElementById('current-title'),
  currentState: document.getElementById('current-state'),
  currentAction: document.getElementById('current-action'),
}

const state = {
  view: 'unread',
  site: null,
  items: [],
  readIds: {},
  page: null, // { url, title, key } for the tab the popup was opened on
}

function partition() {
  const unread = state.items.filter((b) => !state.readIds[b.id])
  const read = state.items.filter((b) => state.readIds[b.id])
  return { unread, read }
}

function itemNode(bookmark, isRead) {
  const li = document.createElement('li')
  li.className = isRead ? 'item is-read' : 'item'

  const link = document.createElement('a')
  link.className = 'item-link'
  link.href = bookmark.url
  link.title = bookmark.url

  const title = document.createElement('div')
  title.className = 'item-title'
  title.textContent = bookmark.title

  const meta = document.createElement('div')
  meta.className = 'item-meta'
  meta.textContent = bookmark.folder || new URL(bookmark.url).hostname

  link.append(title, meta)
  link.addEventListener('click', async (event) => {
    event.preventDefault()
    await chrome.tabs.create({ url: bookmark.url })
    if (CONFIG.MARK_READ_ON_OPEN && !isRead) await toggle(bookmark.id, true)
    else window.close()
  })

  const toggleBtn = document.createElement('button')
  toggleBtn.className = 'toggle'
  toggleBtn.type = 'button'
  toggleBtn.title = isRead ? 'Move back to Unread' : 'Mark as read'
  toggleBtn.setAttribute('aria-label', toggleBtn.title)
  toggleBtn.append(icon(isRead ? 'undo' : 'check'))
  toggleBtn.addEventListener('click', () => toggle(bookmark.id, !isRead))

  li.append(link, toggleBtn)
  return li
}

async function toggle(id, read) {
  state.readIds = await setRead(id, read)
  render()
}

/** The bookmark for the exact page in the tab, if there is one. */
function currentBookmark() {
  if (!state.page) return null
  return state.items.find((b) => urlKey(b.url) === state.page.key) || null
}

/** Bookmark the page the popup was opened on, into the CONFIG.ADD_TO folder. */
async function addCurrent() {
  if (!state.page) return
  el.currentAction.disabled = true
  const parentId = await addFolderId()
  await chrome.bookmarks.create({
    title: state.page.title || state.page.url,
    url: state.page.url,
    ...(parentId ? { parentId } : {}),
  })
  await loadBookmarks()
  el.currentAction.disabled = false
}

function renderCurrent() {
  el.current.hidden = !state.page
  if (!state.page) return

  const bookmark = currentBookmark()
  const isRead = !!bookmark && !!state.readIds[bookmark.id]

  el.currentTitle.textContent = state.page.title || state.page.url
  el.currentTitle.title = state.page.url
  el.currentDot.className = `dot dot--${bookmark ? (isRead ? 'read' : 'unread') : 'none'}`

  if (bookmark) {
    el.currentState.textContent = isRead ? 'read' : 'unread'
    setIcon(
      el.currentAction,
      isRead ? 'undo' : 'check',
      isRead ? 'Move back to Unread' : 'Mark this page as read'
    )
    el.currentAction.onclick = () => toggle(bookmark.id, !isRead)
  } else {
    el.currentState.textContent = 'not bookmarked'
    setIcon(el.currentAction, 'plus', 'Bookmark this page')
    el.currentAction.onclick = addCurrent
  }
}

function render() {
  renderCurrent()

  const { unread, read } = partition()
  el.countUnread.textContent = String(unread.length)
  el.countRead.textContent = String(read.length)

  for (const tab of el.tabs.querySelectorAll('.tab')) {
    tab.classList.toggle('is-active', tab.dataset.view === state.view)
  }

  const showing = state.view === 'unread' ? unread : read
  el.list.replaceChildren(...showing.map((b) => itemNode(b, state.view === 'read')))

  let emptyText = ''
  if (!state.site) emptyText = 'Open a website to see its bookmarks.'
  else if (!state.items.length) emptyText = 'No bookmarks saved for this site yet.'
  else if (!showing.length)
    emptyText = state.view === 'unread' ? 'All caught up — nothing unread.' : 'Nothing marked read.'

  el.empty.textContent = emptyText
  el.empty.hidden = !emptyText
  el.list.hidden = !showing.length
  el.export.disabled = !state.items.length
}

const iso = (ms) => (ms ? new Date(ms).toISOString() : null)

/** Everything this popup is showing for the current site, read and unread alike. */
function exportPayload() {
  const { unread, read } = partition()
  const row = (b, isRead) => ({
    title: b.title,
    url: b.url,
    folder: b.folder,
    dateAdded: iso(b.dateAdded),
    status: isRead ? 'read' : 'unread',
    readAt: isRead ? iso(state.readIds[b.id]) : null,
  })
  return {
    site: state.site.host,
    domain: state.site.domain,
    match: CONFIG.MATCH,
    sort: CONFIG.SORT,
    exportedAt: new Date().toISOString(),
    counts: { unread: unread.length, read: read.length, total: state.items.length },
    unread: unread.map((b) => row(b, false)),
    read: read.map((b) => row(b, true)),
  }
}

el.export.addEventListener('click', () => {
  if (!state.site || !state.items.length) return
  const payload = exportPayload()
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const href = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = href
  const safeHost = state.site.host.replace(/[^a-z0-9.-]/gi, '_')
  link.download = `bookmark-plus-${safeHost}-${payload.exportedAt.slice(0, 10)}.json`
  link.click()
  setTimeout(() => URL.revokeObjectURL(href), 10_000)

  // Confirm without closing the popup — the download bar is easy to miss.
  const label = el.export.title
  setIcon(el.export, 'check', 'Exported')
  setTimeout(() => setIcon(el.export, 'export', label), 1500)
})

// Import lives on its own page: a file picker opened from a popup can dismiss
// the popup before a file is chosen.
el.import.addEventListener('click', async () => {
  await chrome.tabs.create({ url: chrome.runtime.getURL('import.html') })
  window.close()
})

// Off by default; content scripts pick the change up live, on pages already open.
el.annotate.addEventListener('change', () => {
  chrome.storage.local.set({ [ANNOTATE_KEY]: el.annotate.checked })
})

el.tabs.addEventListener('click', (event) => {
  const tab = event.target.closest('.tab')
  if (!tab) return
  state.view = tab.dataset.view
  render()
})

async function loadBookmarks() {
  const bookmarks = await getAllBookmarks()
  state.readIds = await pruneReadIds(bookmarks)
  state.items = state.site ? filterBySite(bookmarks, state.site) : []
  render()
}

async function init() {
  setIcon(el.export, 'export')
  setIcon(el.import, 'import')

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  state.site = siteFromUrl(tab?.url)
  state.page = state.site ? { url: tab.url, title: tab.title, key: urlKey(tab.url) } : null

  el.site.textContent = state.site ? state.site.host : 'No site'
  if (state.site) {
    el.favicon.src = faviconUrl(tab.url)
    el.scope.textContent =
      CONFIG.MATCH === 'domain'
        ? `matching ${state.site.domain} and its subdomains`
        : `matching ${state.site.host} only`
  } else {
    el.scope.textContent = 'This page has no site to match bookmarks against.'
  }

  const settings = await chrome.storage.local.get(ANNOTATE_KEY)
  el.annotate.checked = !!settings[ANNOTATE_KEY]

  await loadBookmarks()
}

init()
