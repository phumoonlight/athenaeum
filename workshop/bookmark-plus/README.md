# Bookmark Plus

A small, personal-use Brave/Chrome extension. While you're on a site, the toolbar
button shows **how many of your saved bookmarks for that site you haven't read
yet**, and the popup lists them split into **Unread** and **Read** tabs. Marking
is one click and always reversible.

It reads your **existing browser bookmarks**. Read/unread is the extension's own
state, stored locally; the only thing it ever writes to your bookmarks is a new
one you ask for with **+ Add** — nothing is modified, moved, or deleted.

## How it works

- The popup looks at the active tab's URL, takes its site, and lists every
  bookmark in your tree whose URL is on that same site, **oldest saved first**
  so the longest-waiting ones surface at the top.
- Above the tabs, a row shows **the page you're actually on**: its title, a blue
  or grey dot, and `unread` / `read` when it's bookmarked, with a button to flip
  it. When it isn't bookmarked the row says `not bookmarked` and offers **+ Add**,
  which saves it to the **bookmarks bar** and drops it straight into the Unread
  tab.
- Each row below shows the bookmark title and the folder it lives in. Clicking it
  opens the bookmark in a new tab.
- The **✓** button on a row moves it to the Read tab; the **↺** button there moves
  it back. Marking is always one bookmark at a time — there is no bulk action.
  All the buttons are icons with tooltips (and `aria-label`s), drawn inline from
  [`icons.js`](icons.js).
- **Export** in the header downloads the current site's bookmarks as JSON —
  both tabs in one file, regardless of which one you're looking at. Nothing else
  is included: other sites stay out of it. See below for the shape.
- **Import** opens a small page in a tab where you drop (or pick) an export file
  and it restores the read/unread marks, matching entries to your bookmarks
  **by URL**. It only writes marks — bookmarks are never created, edited or
  deleted, and URLs you don't have bookmarked are listed as unmatched.
- **Mark bookmarked links on pages** (the toggle at the bottom of the popup,
  **off by default**) puts a small dot on every link in a page that points at
  something you've already bookmarked: **blue for unread, grey for read**. Handy
  for spotting on a link-heavy page what you've saved and what you've finished
  with. Toggling applies live to pages that are already open; no reload needed.
- The background service worker keeps the toolbar badge in sync with the unread
  count for each tab's site. It's fully event-driven (tab, bookmark and storage
  events) — no polling, no alarms, nothing running while you browse elsewhere.

Read marks are keyed by **bookmark id** in `chrome.storage.local`. Marks for
bookmarks that no longer exist are pruned each time the popup opens, so deleting
and re-saving a bookmark brings it back as unread rather than silently read.
State is local (not synced) and survives restarts.

## Marking links on pages

`content.js` runs on every `http(s)` page but is **inert until the toggle is
on** — while off it only listens for the flag (`annotateLinks` in
`chrome.storage.local`) and touches nothing in the DOM.

When on, it collects the page's links and asks the service worker for each one's
status — `unread`, `read`, or nothing if it isn't bookmarked. Every hit gets a
`<span class="bmpx-mark bmpx-mark--unread|--read">`: a white-ringed dot, blue or
grey, appended inside the `<a>` and positioned at its **top-left corner**,
overhanging slightly so it sits beside the first character rather than over it.
The link gets `position: relative` (via `.bmpx-host`) only when the page left it
static, so positioned links are untouched. The dot is `pointer-events: none`, so
it never swallows a click. A debounced `MutationObserver` catches links added
later (infinite scroll, SPA navigation), and adding a bookmark or flipping a read
mark re-marks open pages immediately — dots switch colour without a reload.

The comparison uses the same `urlKey()` as import — normalisation lives only in
the worker, and the content script just sends hrefs and gets back yes/no, so
there is one definition of "the same bookmark".

Because the content script is declared for `http://*/*` and `https://*/*`, Brave
asks for read access to all sites at install time. If that's not wanted, the
alternative is `optional_host_permissions` plus
`chrome.scripting.registerContentScripts()` at toggle time — more moving parts,
and the toggle would then prompt on first use.

## Export format

The file lands in your downloads folder as
`bookmark-plus-<host>-<YYYY-MM-DD>.json`:

```json
{
  "site": "example.com",
  "domain": "example.com",
  "match": "domain",
  "sort": "oldest",
  "exportedAt": "2026-08-07T09:12:33.401Z",
  "counts": { "unread": 2, "read": 1, "total": 3 },
  "unread": [
    {
      "title": "Some article",
      "url": "https://example.com/article",
      "folder": "Bookmarks bar / Reading",
      "dateAdded": "2026-05-02T18:20:00.000Z",
      "status": "unread",
      "readAt": null
    }
  ],
  "read": []
}
```

Both lists follow the same `SORT` order as the popup, and `readAt` records when
you marked it. Bookmark ids are deliberately left out — they're device-specific
and meaningless in another profile, which is why **import matches on URL**.

Two URLs count as the same bookmark when they agree after dropping the `#`
fragment, a leading `www.` and a trailing slash (`urlKey()` in
[`common.js`](common.js)). The query string still counts, and the path stays
case-sensitive. Importing an entry marked `read` restores its original `readAt`
where the file has one; an `unread` entry clears any mark you had.

## Install (load unpacked)

1. Open `brave://extensions` (or `chrome://extensions`).
2. Toggle **Developer mode** on (top-right).
3. Click **Load unpacked** and select this folder.
4. Pin the extension, visit a site you have bookmarks for, and click the button.

For personal use — no need to publish it.

## Tuning

All knobs are the `CONFIG` block at the top of [`common.js`](common.js):

- `MATCH` (default `'domain'`) — `'domain'` treats `docs.example.com` and
  `example.com` as the same site; `'host'` requires an exact hostname match. A
  leading `www.` is ignored either way.
- `SORT` (default `'oldest'`) — order by the date a bookmark was saved. `'oldest'`
  puts the oldest at the top; `'newest'` flips it.
- `ADD_TO` (default `'bar'`) — where **+ Add** saves: the bookmarks bar, or
  `'default'` to let the browser choose (Other bookmarks).
- `MARK_READ_ON_OPEN` (default `false`) — set `true` to mark a bookmark read
  automatically when you open it from the popup.
- `BADGE_COLOR` — badge background.

The dot's size and the two colours (`.bmpx-mark--unread` / `.bmpx-mark--read`)
are in [`content.css`](content.css); the toggle itself is a per-profile setting,
not a `CONFIG` knob.

## Limitations

- **`http(s)` only.** On `brave://`, `file://` or the new tab page there is no
  site to match, and the popup says so.
- **Whole-site matching, not per-page.** A bookmark counts for the site, not for
  the exact URL you're on.
- **Domain detection is a short suffix list.** `registrableDomain()` in
  [`common.js`](common.js) knows the common two-label suffixes (`co.uk`,
  `com.au`, `co.th`, …) and otherwise assumes the last two labels. Not the full
  Public Suffix List — add an entry if some site you use groups wrongly.
- **Read state is per-device** and keyed by bookmark id, so it doesn't follow a
  bookmark to another machine on its own — export/import is the way across.
- **Import restores marks only.** It won't recreate bookmarks you don't have, so
  a fresh profile needs the bookmarks imported through Brave first.
- **Link marks are whole-URL, not per-site.** A link is marked only if that exact
  page is bookmarked (modulo `#fragment`, `www.` and a trailing slash) — the
  popup's looser domain matching doesn't apply there.
- **Link marks skip iframes** and any link whose href isn't `http(s)`.
- **A corner mark can be clipped** by a link inside a container with
  `overflow: hidden`, and on a link that wraps across lines it lands on the first
  line's corner. Reduce the overhang in [`content.css`](content.css) (the
  `transform: translate(...)`) if that bites on a site you use.

## File structure

```
bookmark-plus/
  manifest.json   # MV3; popup, module service worker, content script
  common.js       # CONFIG, site matching, bookmark tree flattening, read-state storage
  background.js   # per-tab unread badge + link lookups for the content script
  content.js      # dots bookmarked links on pages, off by default
  content.css     # the blue/grey link dot
  popup.html      # popup markup
  icons.js        # inline SVG icons for the buttons
  import.html     # import page (own tab)
  import.js       # file drop/pick, URL matching, mark restore
  popup.css       # styling for both pages (light + dark)
  popup.js        # tabs, list rendering, mark read/unread
  README.md       # this file
```
