// Convert a Bookmark Plus export into a file Site Marker can import.
//
//   node tools/from-bookmark-plus.mjs <export.json> [output.ndjson]
//
// Site Marker's importer deliberately refuses Bookmark Plus files — they are a
// different format, and quietly guessing at someone else's shape is how you end
// up importing nonsense. Converting first keeps that boundary and still gets the
// data across.
//
// The output is written by the extension's own `exportText()`, so this can't
// drift from whatever the current format is: change the format and this follows.

import { readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { exportText, siteFromUrl, urlKey } from '../common.js'

/**
 * Bookmark Plus keeps two arrays and a `favorite` flag on each entry, which is
 * the same shape Site Marker uses — the read state comes from which array an
 * entry is in, and the star comes across untouched.
 *
 * Dropped on the way: `folder`, which has no equivalent here, and the per-status
 * timestamps, which fold into `updatedAt` (the latest thing that happened to the
 * entry) since Site Marker keeps only `addedAt` and `updatedAt`.
 */
function toEntry(raw, status) {
  const site = siteFromUrl(raw?.url)
  if (!site) return null

  const at = (value) => Date.parse(value) || 0
  const addedAt = at(raw.dateAdded) || Date.now()
  return {
    url: raw.url,
    title: typeof raw.title === 'string' && raw.title ? raw.title : raw.url,
    host: site.host,
    domain: site.domain,
    status,
    favorite: !!raw.favorite,
    addedAt,
    updatedAt: Math.max(addedAt, at(raw.readAt), at(raw.favoritedAt)),
  }
}

function convert(text) {
  let data
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error("That file isn't valid JSON.")
  }
  if (!Array.isArray(data?.unread) || !Array.isArray(data?.read)) {
    throw new Error("Not a Bookmark Plus export — it has no 'unread' and 'read' lists.")
  }

  const entries = {}
  const stats = { skipped: 0, duplicates: 0, conflicts: 0 }

  // The array an entry sits in is the read state; each entry also carries a
  // matching `status`, but the array is the structural truth of the two.
  for (const [status, list] of [
    ['unread', data.unread],
    ['read', data.read],
  ]) {
    for (const raw of list) {
      const entry = toEntry(raw, status)
      if (!entry) {
        stats.skipped++
        continue
      }

      // Bookmark Plus keys on bookmark ids, so the same page can appear twice —
      // as two bookmarks of one URL, or once in each list. Site Marker keys on
      // the URL, so those have to become one entry.
      const key = urlKey(entry.url)
      const existing = entries[key]
      if (existing) {
        stats.duplicates++
        if (existing.status !== entry.status) stats.conflicts++
        // Read wins over unread, and a star anywhere wins — merging up rather
        // than letting the iteration order decide.
        entry.status = existing.status === 'read' || entry.status === 'read' ? 'read' : 'unread'
        entry.favorite = existing.favorite || entry.favorite
        entry.addedAt = Math.min(existing.addedAt, entry.addedAt)
        entry.updatedAt = Math.max(existing.updatedAt, entry.updatedAt)
      }
      entries[key] = entry
    }
  }

  return { text: exportText(entries), stats, site: data.site }
}

/** `bookmark-plus-foo-2026-08-12.json` → `site-marker-foo-2026-08-12.ndjson` */
function defaultOutput(input) {
  const name = basename(input)
    .replace(/^bookmark-plus-/, '')
    .replace(/\.json$/i, '')
  return join(dirname(input), `site-marker-${name}.ndjson`)
}

const [input, output] = process.argv.slice(2)
if (!input) {
  console.error('usage: node tools/from-bookmark-plus.mjs <export.json> [output.ndjson]')
  process.exit(1)
}

let result
try {
  result = convert(readFileSync(input, 'utf8'))
} catch (error) {
  console.error(`${input}: ${error.message}`)
  process.exit(1)
}

const target = output || defaultOutput(input)
writeFileSync(target, result.text, 'utf8')

// Count from the file that was actually written, not from a tally kept
// alongside it — the numbers then can't disagree with the output.
const header = JSON.parse(result.text.split('\n')[0])
const { total, unread, read, favorite } = header.counts
const { skipped, duplicates, conflicts } = result.stats

console.log(`${result.site || input} → ${target}`)
console.log(`  ${total} pages: ${unread} unread, ${read} read, ${favorite} favorite`)
if (duplicates) {
  console.log(`  ${duplicates} duplicate URLs merged into one entry each`)
  if (conflicts) console.log(`    ${conflicts} of those disagreed on read state — read won`)
}
if (skipped) console.log(`  ${skipped} skipped (not an http(s) URL)`)
console.log('\nImport it from the extension: Manage → Import… → drop the file.')
