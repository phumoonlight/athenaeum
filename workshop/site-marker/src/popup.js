import {
  CONFIG,
  entriesForSite,
  faviconUrl,
  getEntries,
  isSiteAnnotated,
  partition,
  removeEntries,
  setFavorite,
  setSiteAnnotated,
  setStatus,
  siteFromUrl,
  siteKey,
  urlKey,
} from './common.js'
import { icon, setIcon } from './icons.js'

const el = {
  favicon: document.getElementById('favicon'),
  site: document.getElementById('site'),
  scope: document.getElementById('scope'),
  annotate: document.getElementById('annotate'),
  manage: document.getElementById('manage'),
  tabs: document.getElementById('tabs'),
  countUnread: document.getElementById('count-unread'),
  countRead: document.getElementById('count-read'),
  countFavorite: document.getElementById('count-favorite'),
  list: document.getElementById('list'),
  empty: document.getElementById('empty'),
  current: document.getElementById('current'),
  currentDot: document.getElementById('current-dot'),
  currentTitle: document.getElementById('current-title'),
  currentState: document.getElementById('current-state'),
  markToggle: document.getElementById('mark-toggle'),
  markFav: document.getElementById('mark-fav'),
  markRemove: document.getElementById('mark-remove'),
}

const state = {
  view: 'unread',
  site: null,
  entries: {},
  items: [],
  page: null, // { url, title, key } for the tab the popup was opened on
  annotate: false, // is the on-page marker on for this site?
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

/**
 * The current page's read toggle. A page with no read state starts at unread —
 * the point of marking something is usually that you haven't read it yet — and
 * after that it just flips. It never returns to "no read state": that would
 * delete an unstarred page, and a toggle that sometimes deletes is a trap.
 */
const nextCurrent = (status) => (status === 'unread' ? 'read' : 'unread')

function markFavorite(url, favorite, title) {
  return attempt(() => setFavorite(url, favorite, { url, title }))
}

function markStatus(url, status, title) {
  return attempt(() => setStatus(url, status, { url, title }))
}

/**
 * Forget the current page, on one click and with no confirmation. It only ever
 * touches the page you're looking at, and re-marking it is two clicks away —
 * the marks are cheap enough that guarding them costs more than losing one.
 */
async function forgetCurrent() {
  await removeEntries([state.page.key])
  await reload()
}

// --- the site list -----------------------------------------------------------

function itemNode(entry) {
  const li = document.createElement('li')
  li.className = 'item'

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
      button('act', isRead ? 'bookmark' : 'eye', {
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

  // The toggle's icon is the tab it would send the page to — an eye for read, a
  // bookmark for unread — so the buttons and the tabs speak the same language.
  // Both come off `nextCurrent`, so the icon can't promise one thing while the
  // click does another: an unmarked page shows a bookmark, because clicking adds
  // it as unread rather than marking it read. Lit means already tracked.
  const next = nextCurrent(status)
  el.markToggle.classList.toggle('is-on', !!status)
  setIcon(
    el.markToggle,
    next === 'read' ? 'eye' : 'bookmark',
    !status ? 'Add as unread' : next === 'read' ? 'Mark as read' : 'Move back to unread'
  )

  el.markFav.classList.toggle('is-on', favorite)
  setIcon(el.markFav, 'star', favorite ? 'Remove from Favorites' : 'Add to Favorites')

  // Nothing to forget until the page is actually marked.
  el.markRemove.hidden = !entry
  setIcon(el.markRemove, 'trash', 'Forget this page')
}

/**
 * The link-dot switch, which is **this site's** — the popup is the only place
 * that knows which site you're on, so it's the only place that can ask the
 * question. Lit means the dots are on here; every other site is unaffected.
 */
function renderAnnotate() {
  el.annotate.disabled = !state.site
  el.annotate.classList.toggle('is-on', state.annotate)
  setIcon(
    el.annotate,
    'marker',
    !state.site
      ? 'No site to show link dots on'
      : state.annotate
        ? `Stop showing link dots on ${siteKey(state.site)}`
        : `Show link dots on ${siteKey(state.site)}`
  )
}

function render() {
  renderCurrent()
  renderAnnotate()

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

/**
 * Writes can fail the same way a mark can, so put the switch back rather than
 * leaving a button that says the dots are on when nothing was saved.
 */
el.annotate.addEventListener('click', async () => {
  if (!state.site) return
  state.annotate = !state.annotate
  renderAnnotate()
  try {
    await setSiteAnnotated(state.site, state.annotate)
  } catch (error) {
    state.annotate = !state.annotate
    renderAnnotate()
    el.currentState.textContent = error.message || 'Could not save.'
  }
})

el.manage.addEventListener('click', async () => {
  await chrome.tabs.create({ url: chrome.runtime.getURL('views/manage.html') })
  window.close()
})

async function init() {
  setIcon(el.manage, 'list')
  // Each tab names its own icon, so adding one is a markup change, not a code one.
  for (const tab of el.tabs.querySelectorAll('.tab')) {
    tab.querySelector('.tab-glyph').append(icon(tab.dataset.icon))
  }

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  state.site = siteFromUrl(tab?.url)
  state.page = state.site ? { url: tab.url, title: tab.title, key: urlKey(tab.url) } : null

  state.annotate = await isSiteAnnotated(state.site)

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

  el.markToggle.addEventListener('click', () => {
    if (state.page)
      markStatus(state.page.url, nextCurrent(currentEntry()?.status), state.page.title)
  })
  el.markFav.addEventListener('click', () => {
    if (state.page) markFavorite(state.page.url, !currentEntry()?.favorite, state.page.title)
  })
  el.markRemove.addEventListener('click', () => {
    if (state.page && currentEntry()) forgetCurrent()
  })

  await reload()
}

init()
