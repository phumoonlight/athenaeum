// Import runs on its own extension page rather than in the popup: opening a file
// picker from a popup can dismiss the popup before the file is chosen, which
// would drop the result on the floor.

import { applyFavMarks, applyReadMarks, getAllBookmarks, urlKey } from './common.js'

const el = {
  drop: document.getElementById('drop'),
  file: document.getElementById('file'),
  status: document.getElementById('status'),
  detail: document.getElementById('detail'),
}

function report(message, kind, lines = []) {
  el.status.textContent = message
  el.status.className = `status is-${kind}`
  el.status.hidden = false
  el.detail.replaceChildren(
    ...lines.map((line) => {
      const li = document.createElement('li')
      li.textContent = line
      return li
    })
  )
  el.detail.hidden = !lines.length
}

/** Pull `{ url, status, readAt }` rows out of an export file, tolerating either group being absent. */
function readEntries(data) {
  const groups = [
    [data?.unread, 'unread'],
    [data?.read, 'read'],
  ]
  const entries = []
  for (const [list, fallbackStatus] of groups) {
    if (!Array.isArray(list)) continue
    for (const row of list) {
      if (!row || typeof row.url !== 'string') continue
      entries.push({
        url: row.url,
        status: row.status || fallbackStatus,
        readAt: row.readAt,
        favorite: !!row.favorite,
        favoritedAt: row.favoritedAt,
      })
    }
  }
  return entries
}

async function importFile(file) {
  let data
  try {
    data = JSON.parse(await file.text())
  } catch {
    report(`${file.name} isn't valid JSON.`, 'bad')
    return
  }

  const entries = readEntries(data)
  if (!entries.length) {
    report('No bookmark entries found in that file.', 'bad')
    return
  }

  const byUrl = new Map(entries.map((entry) => [urlKey(entry.url), entry]))
  const bookmarks = await getAllBookmarks()
  const marks = {}
  const favMarks = {}
  let read = 0
  let unread = 0
  let favorite = 0
  const matchedKeys = new Set()

  for (const bookmark of bookmarks) {
    const key = urlKey(bookmark.url)
    const entry = byUrl.get(key)
    if (!entry) continue
    matchedKeys.add(key)
    if (entry.status === 'read') {
      // Keep the original mark time when the file has one.
      marks[bookmark.id] = Date.parse(entry.readAt || '') || Date.now()
      read++
    } else {
      marks[bookmark.id] = null
      unread++
    }
    if (entry.favorite) {
      favMarks[bookmark.id] = Date.parse(entry.favoritedAt || '') || Date.now()
      favorite++
    } else {
      favMarks[bookmark.id] = null
    }
  }

  const unmatched = entries.filter((entry) => !matchedKeys.has(urlKey(entry.url)))

  if (!Object.keys(marks).length) {
    report(
      `None of the ${entries.length} entries matched a bookmark in this profile.`,
      'bad',
      unmatched.map((entry) => entry.url)
    )
    return
  }

  await applyReadMarks(marks)
  await applyFavMarks(favMarks)
  const site = data.site ? ` for ${data.site}` : ''
  report(
    `Imported${site}: ${read} marked read, ${unread} set back to unread, ` +
      `${favorite} starred` +
      (unmatched.length ? `, ${unmatched.length} not bookmarked here.` : '.'),
    'ok',
    unmatched.map((entry) => `not bookmarked here: ${entry.url}`)
  )
}

el.drop.addEventListener('click', () => el.file.click())
el.drop.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    el.file.click()
  }
})

el.file.addEventListener('change', () => {
  const file = el.file.files?.[0]
  if (file) importFile(file)
  el.file.value = '' // let the same file be picked again
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

el.drop.addEventListener('drop', (event) => {
  event.preventDefault()
  const file = event.dataTransfer?.files?.[0]
  if (file) importFile(file)
})
