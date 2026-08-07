import {
  addFolderId,
  ANNOTATE_KEY,
  CONFIG,
  faviconUrl,
  filterBySite,
  getAllBookmarks,
  pruneMarks,
  setFavorite,
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
  countFavorite: document.getElementById('count-favorite'),
  tabFavIcon: document.getElementById('tab-fav-icon'),
  list: document.getElementById('list'),
  empty: document.getElementById('empty'),
  export: document.getElementById('export'),
  import: document.getElementById('import'),
  annotate: document.getElementById('annotate'),
  current: document.getElementById('current'),
  currentDot: document.getElementById('current-dot'),
  currentTitle: document.getElementById('current-title'),
  currentState: document.getElementById('current-state'),
  currentStar: document.getElementById('current-star'),
  currentAction: document.getElementById('current-action'),
}

const state = {
  view: 'unread',
  site: null,
  items: [],
  readIds: {},
  favIds: {},
  page: null, // { url, title, key } for the tab the popup was opened on
}

/**
 * Unread and read split the site's bookmarks in two; favourites cut across both,
 * so a starred bookmark still appears in whichever of the first two it belongs to.
 */
function partition() {
  const unread = state.items.filter((b) => !state.readIds[b.id])
  const read = state.items.filter((b) => state.readIds[b.id])
  const favorite = state.items.filter((b) => state.favIds[b.id])
  return { unread, read, favorite }
}

function itemNode(bookmark) {
  const isRead = !!state.readIds[bookmark.id]
  const isFavorite = !!state.favIds[bookmark.id]

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

  const starBtn = document.createElement('button')
  starBtn.className = isFavorite ? 'act star is-on' : 'act star'
  starBtn.type = 'button'
  starBtn.title = isFavorite ? 'Remove from Favorites' : 'Add to Favorites'
  starBtn.setAttribute('aria-label', starBtn.title)
  starBtn.append(icon('star'))
  starBtn.addEventListener('click', () => toggleFavorite(bookmark.id, !isFavorite))

  const toggleBtn = document.createElement('button')
  toggleBtn.className = 'act'
  toggleBtn.type = 'button'
  toggleBtn.title = isRead ? 'Move back to Unread' : 'Mark as read'
  toggleBtn.setAttribute('aria-label', toggleBtn.title)
  toggleBtn.append(icon(isRead ? 'undo' : 'check'))
  toggleBtn.addEventListener('click', () => toggle(bookmark.id, !isRead))

  // Floated over the row's right edge rather than sitting in the flow, so the
  // title gets the full width until you hover.
  const actions = document.createElement('div')
  actions.className = 'item-actions'
  actions.append(toggleBtn, starBtn)

  li.append(link, actions)
  return li
}

async function toggle(id, read) {
  state.readIds = await setRead(id, read)
  render()
}

async function toggleFavorite(id, favorite) {
  state.favIds = await setFavorite(id, favorite)
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

  el.currentStar.hidden = !bookmark // nothing to star until the page is bookmarked

  if (bookmark) {
    const isFavorite = !!state.favIds[bookmark.id]
    el.currentStar.className = isFavorite ? 'ghost star is-on' : 'ghost star'
    setIcon(
      el.currentStar,
      'star',
      isFavorite ? 'Remove from Favorites' : 'Add this page to Favorites'
    )
    el.currentStar.onclick = () => toggleFavorite(bookmark.id, !isFavorite)

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

  const groups = partition()
  el.countUnread.textContent = String(groups.unread.length)
  el.countRead.textContent = String(groups.read.length)
  el.countFavorite.textContent = String(groups.favorite.length)

  for (const tab of el.tabs.querySelectorAll('.tab')) {
    tab.classList.toggle('is-active', tab.dataset.view === state.view)
  }

  const showing = groups[state.view]
  el.list.replaceChildren(...showing.map(itemNode))

  const nothingHere = {
    unread: 'All caught up — nothing unread.',
    read: 'Nothing marked read.',
    favorite: 'No favorites for this site yet.',
  }

  let emptyText = ''
  if (!state.site) emptyText = 'Open a website to see its bookmarks.'
  else if (!state.items.length) emptyText = 'No bookmarks saved for this site yet.'
  else if (!showing.length) emptyText = nothingHere[state.view]

  el.empty.textContent = emptyText
  el.empty.hidden = !emptyText
  el.list.hidden = !showing.length
  el.export.disabled = !state.items.length
}

const iso = (ms) => (ms ? new Date(ms).toISOString() : null)

/** Everything this popup is showing for the current site, read and unread alike. */
function exportPayload() {
  const { unread, read, favorite } = partition()
  const row = (b, isRead) => ({
    title: b.title,
    url: b.url,
    folder: b.folder,
    dateAdded: iso(b.dateAdded),
    status: isRead ? 'read' : 'unread',
    readAt: isRead ? iso(state.readIds[b.id]) : null,
    favorite: !!state.favIds[b.id],
    favoritedAt: iso(state.favIds[b.id]),
  })
  return {
    site: state.site.host,
    domain: state.site.domain,
    match: CONFIG.MATCH,
    sort: CONFIG.SORT,
    exportedAt: new Date().toISOString(),
    counts: {
      unread: unread.length,
      read: read.length,
      favorite: favorite.length,
      total: state.items.length,
    },
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
  const marks = await pruneMarks(bookmarks)
  state.readIds = marks.readIds
  state.favIds = marks.favIds
  state.items = state.site ? filterBySite(bookmarks, state.site) : []
  render()
}

async function init() {
  setIcon(el.export, 'export')
  setIcon(el.import, 'import')
  el.tabFavIcon.append(icon('star'))

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
