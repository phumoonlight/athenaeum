import {
  CONFIG,
  entriesForSite,
  faviconUrl,
  getEntries,
  partition,
  setFavorite,
  setStatus,
  siteFromUrl,
  urlKey,
} from './common.js'
import { icon, setIcon } from './icons.js'

const el = {
  favicon: document.getElementById('favicon'),
  site: document.getElementById('site'),
  scope: document.getElementById('scope'),
  manage: document.getElementById('manage'),
  tabs: document.getElementById('tabs'),
  countUnread: document.getElementById('count-unread'),
  countRead: document.getElementById('count-read'),
  countFavorite: document.getElementById('count-favorite'),
  tabFavIcon: document.getElementById('tab-fav-icon'),
  list: document.getElementById('list'),
  empty: document.getElementById('empty'),
  current: document.getElementById('current'),
  currentDot: document.getElementById('current-dot'),
  currentTitle: document.getElementById('current-title'),
  currentState: document.getElementById('current-state'),
  markUnread: document.getElementById('mark-unread'),
  markRead: document.getElementById('mark-read'),
  markFav: document.getElementById('mark-fav'),
}

const state = {
  view: 'unread',
  site: null,
  entries: {},
  items: [],
  page: null, // { url, title, key } for the tab the popup was opened on
}

const currentEntry = () => (state.page ? state.entries[state.page.key] || null : null)

async function reload() {
  state.entries = await getEntries()
  state.items = state.site ? entriesForSite(state.entries, state.site) : []
  render()
}

// --- marking -----------------------------------------------------------------

/**
 * A write can fail — the storage quota, or a full disk. Say so on the status
 * line instead of leaving a click that silently did nothing.
 */
async function attempt(run) {
  try {
    await run()
  } catch (error) {
    await reload()
    el.currentState.textContent = error.message || 'Could not save.'
    return
  }
  await reload()
}

/** The other read state — what a row's first button moves the page to. */
const nextStatus = (status) => (status === 'read' ? 'unread' : 'read')

function markFavorite(url, favorite, title) {
  return attempt(() => setFavorite(url, favorite, { url, title }))
}

function markStatus(url, status, title) {
  return attempt(() => setStatus(url, status, { url, title }))
}

// --- the site list -----------------------------------------------------------

function itemNode(entry) {
  const li = document.createElement('li')
  li.className = entry.status === 'read' ? 'item is-read' : 'item'

  const link = document.createElement('a')
  link.className = 'item-link'
  link.href = entry.url
  link.title = entry.url

  const title = document.createElement('div')
  title.className = 'item-title'
  title.textContent = entry.title

  const meta = document.createElement('div')
  meta.className = 'item-meta'
  meta.textContent = pathOf(entry.url)

  link.append(title, meta)
  link.addEventListener('click', async (event) => {
    event.preventDefault()
    await chrome.tabs.create({ url: entry.url })
    window.close()
  })

  // What a row offers depends on the tab it's in. Under Unread and Read the two
  // useful moves are "flip the read state" and "star it"; under ★ the only one
  // is "unstar", since the read state is already whatever the other tabs show.
  const isRead = entry.status === 'read'
  const actions = document.createElement('div')
  actions.className = 'item-actions'

  if (state.view === 'favorite') {
    actions.append(
      button('act star is-on', 'star', {
        label: 'Remove from Favorites',
        onClick: () => markFavorite(entry.url, false, entry.title),
      })
    )
  } else {
    actions.append(
      button('act', isRead ? 'undo' : 'check', {
        label: isRead ? 'Move back to unread' : 'Mark as read',
        onClick: () => markStatus(entry.url, nextStatus(entry.status), entry.title),
      }),
      button(entry.favorite ? 'act star is-on' : 'act star', 'star', {
        label: entry.favorite ? 'Remove from Favorites' : 'Add to Favorites',
        onClick: () => markFavorite(entry.url, !entry.favorite, entry.title),
      })
    )
  }

  li.append(link, actions)
  return li
}

function button(className, iconName, { label, onClick }) {
  const node = document.createElement('button')
  node.className = className
  node.type = 'button'
  node.title = label
  node.setAttribute('aria-label', label)
  node.append(icon(iconName))
  node.addEventListener('click', onClick)
  return node
}

/** Rows are all on one site, so the path carries more than the host would. */
function pathOf(url) {
  try {
    const parsed = new URL(url)
    return parsed.pathname + parsed.search
  } catch {
    return url
  }
}

// --- the current page --------------------------------------------------------

function renderCurrent() {
  el.current.hidden = !state.page
  if (!state.page) return

  const entry = currentEntry()
  const status = entry?.status || null

  el.currentTitle.textContent = state.page.title || state.page.url
  el.currentTitle.title = state.page.url
  const favorite = !!entry?.favorite
  el.currentDot.className = `dot dot--${status || 'none'}${favorite ? ' dot--fav' : ''}`
  el.currentState.textContent = status
    ? favorite
      ? `${status} · favorite`
      : status
    : favorite
      ? 'favorite'
      : 'not marked'

  // Unread and read are the same choice, so the one it's already in is lit and
  // has nothing to do. The star is a separate question and always clickable.
  el.markUnread.classList.toggle('is-on', status === 'unread')
  el.markUnread.disabled = status === 'unread'
  el.markRead.classList.toggle('is-on', status === 'read')
  el.markRead.disabled = status === 'read'

  el.markFav.classList.toggle('is-on', favorite)
  setIcon(el.markFav, 'star', favorite ? 'Remove from Favorites' : 'Add to Favorites')
}

function render() {
  renderCurrent()

  const groups = partition(state.items)
  el.countUnread.textContent = String(groups.unread.length)
  el.countRead.textContent = String(groups.read.length)
  el.countFavorite.textContent = String(groups.favorite.length)

  for (const tab of el.tabs.querySelectorAll('.tab')) {
    tab.classList.toggle('is-active', tab.dataset.view === state.view)
  }

  const showing = groups[state.view]
  el.list.replaceChildren(...showing.map(itemNode))

  const nothingHere = {
    unread: 'Nothing unread on this site.',
    read: 'Nothing marked read on this site.',
    favorite: 'No favorites on this site yet.',
  }

  let emptyText = ''
  if (!state.site) emptyText = 'Open a website to mark it.'
  else if (!state.items.length) emptyText = 'Nothing marked on this site yet.'
  else if (!showing.length) emptyText = nothingHere[state.view]

  el.empty.textContent = emptyText
  el.empty.hidden = !emptyText
  el.list.hidden = !showing.length
}

// --- wiring ------------------------------------------------------------------

el.tabs.addEventListener('click', (event) => {
  const tab = event.target.closest('.tab')
  if (!tab) return
  state.view = tab.dataset.view
  render()
})

el.manage.addEventListener('click', async () => {
  await chrome.tabs.create({ url: chrome.runtime.getURL('manage.html') })
  window.close()
})

async function init() {
  setIcon(el.manage, 'list')
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
    el.scope.textContent = 'This page has no site to mark.'
  }

  setIcon(el.markUnread, 'circle', 'Mark as unread')
  setIcon(el.markRead, 'check', 'Mark as read')
  setIcon(el.markFav, 'star', 'Add to Favorites')

  el.markUnread.addEventListener('click', () => {
    if (state.page) markStatus(state.page.url, 'unread', state.page.title)
  })
  el.markRead.addEventListener('click', () => {
    if (state.page) markStatus(state.page.url, 'read', state.page.title)
  })
  el.markFav.addEventListener('click', () => {
    if (state.page) markFavorite(state.page.url, !currentEntry()?.favorite, state.page.title)
  })

  await reload()
}

init()
