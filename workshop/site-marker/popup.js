import {
  CONFIG,
  entriesForSite,
  faviconUrl,
  getEntries,
  partition,
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
  markToggle: document.getElementById('mark-toggle'),
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

/**
 * The read toggle. An unmarked page starts at unread — the point of marking
 * something is usually that you haven't read it — and after that it flips
 * between the two. From favorite it comes back to unread: the three states are
 * exclusive now, and unread is the neutral one.
 *
 * There is deliberately no "back to unmarked" step: dropping a page entirely is
 * the manage page's job, so nothing in this popup can lose an entry to a stray
 * click.
 */
const nextStatus = (status) => (status === 'unread' ? 'read' : 'unread')

/** The star. Clicking a lit one returns the page to unread, not to nothing. */
const nextStar = (status) => (status === 'favorite' ? 'unread' : 'favorite')

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

  // Read state first, star second — the same order as the current-page row above.
  // Deleting lives on the manage page, so a crowded list can't lose an entry to a
  // stray click.
  const actions = document.createElement('div')
  actions.className = 'item-actions'
  actions.append(
    button('act', entry.status === 'read' ? 'undo' : 'check', {
      label: entry.status === 'read' ? 'Move back to Unread' : 'Mark as read',
      onClick: () => markStatus(entry.url, nextStatus(entry.status), entry.title),
    }),
    button(entry.status === 'favorite' ? 'act star is-on' : 'act star', 'star', {
      label: entry.status === 'favorite' ? 'Move back to Unread' : 'Mark as favorite',
      onClick: () => markStatus(entry.url, nextStar(entry.status), entry.title),
    })
  )

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
  el.currentDot.className = `dot dot--${status || 'none'}`
  el.currentState.textContent = status || 'not marked'

  // The toggle carries unread/read; the star carries the third state. Only one
  // of the two can be lit, because only one status can be true.
  el.markToggle.classList.toggle('is-on', status === 'unread' || status === 'read')
  setIcon(
    el.markToggle,
    status === 'read' ? 'check' : 'circle',
    status === 'read' ? 'Move back to unread' : 'Mark as read'
  )

  el.markFav.classList.toggle('is-on', status === 'favorite')
  setIcon(el.markFav, 'star', status === 'favorite' ? 'Move back to unread' : 'Mark as favorite')
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

  const markCurrent = (fn) => () => state.page && fn()
  el.markToggle.addEventListener(
    'click',
    markCurrent(() =>
      markStatus(state.page.url, nextStatus(currentEntry()?.status), state.page.title)
    )
  )
  el.markFav.addEventListener(
    'click',
    markCurrent(() => markFavorite(state.page.url, state.page.title))
  )

  await reload()
}

init()
