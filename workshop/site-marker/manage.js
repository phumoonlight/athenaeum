// Every marked page across every site, plus the two ways data leaves and enters:
// export and import files.

import {
  ANNOTATE_KEY,
  applyEntries,
  counts,
  exportText,
  getEntries,
  parseExport,
  removeEntries,
  sortedEntries,
  updateEntries,
  urlKey,
} from './common.js'

const el = {
  summary: document.getElementById('summary'),
  export: document.getElementById('export'),
  import: document.getElementById('import'),
  annotate: document.getElementById('annotate'),
  importPanel: document.getElementById('import-panel'),
  importClose: document.getElementById('import-close'),
  importMessage: document.getElementById('import-message'),
  drop: document.getElementById('drop'),
  file: document.getElementById('file'),
  chips: document.getElementById('chips'),
  search: document.getElementById('search'),
  selectAll: document.getElementById('select-all'),
  bulkCount: document.getElementById('bulk-count'),
  bulkActions: document.querySelectorAll('[data-bulk]'),
  groups: document.getElementById('groups'),
  empty: document.getElementById('empty'),
}

const state = {
  entries: {},
  bytes: 0,
  filter: 'all',
  query: '',
  // Which sites are open. Tracking the exceptions rather than the rule is what
  // makes "collapsed" the default, including for sites that appear later.
  expanded: new Set(),
  // Storage keys, not DOM state, so a re-render keeps the selection.
  selected: new Set(),
}

async function reload() {
  state.entries = await getEntries()
  // Shown in the summary so the store's growth is visible rather than a mystery.
  state.bytes = await chrome.storage.local.getBytesInUse(null).catch(() => 0)
  render()
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

// --- filtering and grouping --------------------------------------------------

function visible() {
  const query = state.query.trim().toLowerCase()
  return sortedEntries(state.entries).filter((entry) => {
    if (state.filter === 'favorite' && !entry.favorite) return false
    if ((state.filter === 'unread' || state.filter === 'read') && entry.status !== state.filter) {
      return false
    }
    if (!query) return true
    return entry.title.toLowerCase().includes(query) || entry.url.toLowerCase().includes(query)
  })
}

/** Sites start closed; a search opens whatever it matched. */
const isOpen = (domain) => !!state.query.trim() || state.expanded.has(domain)

/** Busiest sites first — the ones worth scrolling to are at the top. */
function groupByDomain(list) {
  const byDomain = new Map()
  for (const entry of list) {
    if (!byDomain.has(entry.domain)) byDomain.set(entry.domain, [])
    byDomain.get(entry.domain).push(entry)
  }
  return [...byDomain.entries()].sort((a, b) => b[1].length - a[1].length || (a[0] < b[0] ? -1 : 1))
}

// --- rendering ---------------------------------------------------------------

function rowNode(entry) {
  const key = urlKey(entry.url)
  const row = document.createElement('li')
  row.className = 'item'
  if (state.selected.has(key)) row.classList.add('is-picked')

  const pick = document.createElement('input')
  pick.type = 'checkbox'
  pick.className = 'pick'
  pick.checked = state.selected.has(key)
  pick.title = 'Select for a bulk action'
  pick.addEventListener('change', () => {
    if (pick.checked) state.selected.add(key)
    else state.selected.delete(key)
    render()
  })

  const link = document.createElement('a')
  link.className = 'item-link'
  link.href = entry.url
  link.target = '_blank'
  link.rel = 'noreferrer'
  link.title = entry.url

  const title = document.createElement('div')
  title.className = 'item-title'
  title.textContent = entry.title

  const meta = document.createElement('div')
  meta.className = 'item-meta'
  meta.textContent = entry.url

  link.append(title, meta)

  // No per-row buttons: everything here is done by ticking rows and using the
  // bulk bar. One page is just a selection of one, and a list this long is the
  // wrong place for a delete button you can hit by accident.
  row.append(pick, link)
  return row
}

function groupNode(domain, list) {
  const section = document.createElement('section')
  section.className = 'group'

  const head = document.createElement('div')
  head.className = 'group-head'

  const keys = list.map((entry) => urlKey(entry.url))
  const picked = keys.filter((key) => state.selected.has(key)).length

  const pick = document.createElement('input')
  pick.type = 'checkbox'
  pick.className = 'pick'
  pick.checked = picked === keys.length
  // Some but not all: shown hollow-with-a-dash rather than lying either way.
  pick.indeterminate = picked > 0 && picked < keys.length
  pick.title = `Select everything on ${domain}`
  pick.addEventListener('change', () => {
    for (const key of keys) {
      if (pick.checked) state.selected.add(key)
      else state.selected.delete(key)
    }
    render()
  })

  const toggle = document.createElement('button')
  toggle.className = 'group-toggle'
  toggle.type = 'button'
  // A text search that hides its own results would be useless, so a query opens
  // everything it matched; the chips only narrow, so they leave sites closed.
  const open = isOpen(domain)
  toggle.textContent = `${open ? '▾' : '▸'} ${domain}`
  toggle.addEventListener('click', () => {
    if (state.expanded.has(domain)) state.expanded.delete(domain)
    else state.expanded.add(domain)
    render()
  })

  const tally = document.createElement('span')
  tally.className = 'group-tally'
  const group = counts(list)
  tally.textContent = `${group.total} · ${group.unread} unread${group.favorite ? ` · ${group.favorite} ★` : ''}`

  head.append(pick, toggle, tally)
  section.append(head)

  if (open) {
    const items = document.createElement('ul')
    items.className = 'list list--flat'
    items.append(...list.map(rowNode))
    section.append(items)
  }
  return section
}

function render() {
  const all = sortedEntries(state.entries)
  const total = counts(all)
  el.summary.textContent = all.length
    ? `${total.total} pages across ${total.sites} sites — ${total.unread} unread, ${total.read} read, ` +
      `${total.favorite} favorite · ${formatBytes(state.bytes)} stored`
    : 'Nothing marked yet.'
  el.export.disabled = !all.length

  for (const chip of el.chips.querySelectorAll('.chip')) {
    chip.classList.toggle('is-active', chip.dataset.filter === state.filter)
  }

  const showing = visible()
  el.groups.replaceChildren(
    ...groupByDomain(showing).map(([domain, list]) => groupNode(domain, list))
  )
  renderSelection(showing)

  const emptyText = !all.length
    ? 'Mark a page from the toolbar popup and it will show up here.'
    : !showing.length
      ? 'Nothing matches this filter.'
      : ''
  el.empty.textContent = emptyText
  el.empty.hidden = !emptyText
}

// --- bulk actions ------------------------------------------------------------

/**
 * The selection is only ever what's on screen: changing a filter clears it, so a
 * bulk action can never reach a row you can't see. The count says exactly how
 * many rows are about to change.
 */
function renderSelection(showing) {
  const count = state.selected.size
  el.bulkCount.textContent = count ? `${count} selected` : 'Select all'
  el.selectAll.checked = count > 0 && count === showing.length
  el.selectAll.indeterminate = count > 0 && count < showing.length
  el.selectAll.disabled = !showing.length
  for (const action of el.bulkActions) action.disabled = !count
}

function clearSelection() {
  state.selected.clear()
}

const BULK = {
  unread: { status: 'unread' },
  read: { status: 'read' },
  favorite: { favorite: true },
  unfavorite: { favorite: false },
}

async function runBulk(action) {
  const keys = [...state.selected]
  if (!keys.length) return

  if (action === 'delete') {
    if (!confirm(`Forget ${keys.length} marked page${keys.length === 1 ? '' : 's'}?`)) return
    await removeEntries(keys)
    clearSelection()
    await reload()
    return
  }

  // Unstarring a favourite that has no read state removes it outright — the same
  // rule a single unstar follows — so warn rather than silently deleting.
  if (action === 'unfavorite') {
    const orphans = keys.filter((key) => state.entries[key] && !state.entries[key].status).length
    if (
      orphans &&
      !confirm(
        `${orphans} of these are favorites with no read state, so unfavoriting drops them ` +
          `entirely. Continue?`
      )
    ) {
      return
    }
  }

  try {
    await updateEntries(keys, BULK[action])
  } catch (error) {
    // Nothing was written, so keep the selection — the point is to try again.
    alert(error.message || 'Could not save.')
    return
  }
  clearSelection()
  await reload()
}

for (const action of el.bulkActions) {
  action.addEventListener('click', () => runBulk(action.dataset.bulk))
}

el.selectAll.addEventListener('change', () => {
  clearSelection()
  if (el.selectAll.checked) {
    for (const entry of visible()) state.selected.add(urlKey(entry.url))
  }
  render()
})

// --- export / import ---------------------------------------------------------

el.export.addEventListener('click', () => {
  const text = exportText(state.entries)
  const blob = new Blob([text], { type: 'application/x-ndjson' })
  const href = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = href
  link.download = `site-marker-${new Date().toISOString().slice(0, 10)}.ndjson`
  link.click()
  setTimeout(() => URL.revokeObjectURL(href), 10_000)
})

const importMode = () => document.querySelector('input[name="mode"]:checked').value

function say(node, text, kind) {
  node.textContent = text
  node.className = `status${kind ? ` is-${kind}` : ''}`
  node.hidden = !text
}

async function importText(text) {
  let incoming
  try {
    incoming = parseExport(text)
  } catch (error) {
    say(el.importMessage, error.message, 'bad')
    return
  }
  const replace = importMode() === 'replace'
  if (replace && !confirm(`Replace all marks with the ${incoming.length} in this file?`)) return

  let result
  try {
    result = await applyEntries(incoming, { replace })
  } catch (error) {
    // Bulk writes are the one place likely to hit a storage limit.
    say(el.importMessage, String(error.message || error), 'bad')
    await reload()
    return
  }
  const parts = [`${result.added} added`, `${result.updated} updated`, `${result.unchanged} kept`]
  if (result.removed) parts.push(`${result.removed} replaced`)
  say(el.importMessage, `Imported: ${parts.join(', ')}.`, 'ok')
  await reload()
}

el.import.addEventListener('click', () => {
  el.importPanel.hidden = false
  el.importPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
})

el.importClose.addEventListener('click', () => {
  el.importPanel.hidden = true
  say(el.importMessage, '')
})

el.drop.addEventListener('click', () => el.file.click())
el.drop.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') el.file.click()
})

el.file.addEventListener('change', async () => {
  const file = el.file.files?.[0]
  if (file) await importText(await file.text())
  el.file.value = ''
})

for (const type of ['dragenter', 'dragover']) {
  el.drop.addEventListener(type, (event) => {
    event.preventDefault()
    el.drop.classList.add('is-over')
  })
}

for (const type of ['dragleave', 'drop']) {
  el.drop.addEventListener(type, () => el.drop.classList.remove('is-over'))
}

el.drop.addEventListener('drop', async (event) => {
  event.preventDefault()
  const file = event.dataTransfer?.files?.[0]
  if (file) await importText(await file.text())
})

// --- wiring ------------------------------------------------------------------

// Off by default; content scripts pick the change up live, on pages already open.
el.annotate.addEventListener('change', () => {
  chrome.storage.local.set({ [ANNOTATE_KEY]: el.annotate.checked })
})

el.chips.addEventListener('click', (event) => {
  const chip = event.target.closest('.chip')
  if (!chip) return
  state.filter = chip.dataset.filter
  clearSelection()
  render()
})

el.search.addEventListener('input', () => {
  state.query = el.search.value
  clearSelection()
  render()
})

// Reading the toggle only after `reload()` matters on the first run of a build
// that renamed a key: the store's migration happens inside it, so a read before
// it would find the old name still in place and the new one empty.
reload().then(async () => {
  const stored = await chrome.storage.local.get(ANNOTATE_KEY)
  el.annotate.checked = !!stored[ANNOTATE_KEY]
})
