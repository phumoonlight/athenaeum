# Site Marker

A small, personal-use Brave/Chrome extension. Mark **any page** as **unread**, **read**
or **★ favorite** — see that state on the toolbar icon and on every link pointing at it, and
find it again later. Marking is one click and always reversible.

Unlike [Bookmark Plus](../bookmark-plus/README.md), which annotates your browser
bookmarks, **Site Marker owns its own store**. Nothing needs to be bookmarked first, and
the extension never reads or writes your bookmarks — it doesn't even ask for the
permission. Everything it knows lives in the browser profile; **export and import** are how
it moves.

## How it works

- Marks are per **page URL**, not per site. The popup then groups by site to answer
  "what have I marked here".
- A page has a **read state** — `unread` or `read`, or neither — and, separately, a **★
  favourite** flag. Favourites cut _across_ read state: a starred page still sits in Unread
  or Read, and starring never changes whether it's read. A page can also be starred with no
  read state at all.
- **The toolbar icon is the state of the page you're on**: blue for unread, grey for read,
  with a **gold ring** when it's a favourite, and a quiet hollow ring when the page isn't
  marked. No badge, no count — the icon is the whole signal.
- The popup's top row is **the page you're actually on**: its title, a state dot, and two
  buttons. The first is **one toggle carrying the read state** — an unmarked page starts at
  _unread_, and after that each click flips unread ↔ read. The second is `★`, a separate
  question with its own button, so a page can be `read · favorite`. Below them,
  `Unread` / `Read` / `★` tabs list everything marked on the current site, oldest first.
- **What a row in that list offers depends on the tab.** Under Unread and Read the two
  useful moves are flipping the read state and starring, so those rows carry both. Under ★
  the only one is unstarring — the read state is already whatever the other tabs show.
- Nothing in the popup returns a page to **unmarked**. To drop a page entirely, use the
  manage page.
- A page is recorded the moment you mark it, and **deleted once it has neither a read state
  nor a star** — so the store is exactly the set of pages you cared about. Visiting a site
  records nothing; there is no history tracking.
- **Manage** (the header button) opens a page listing **every marked page across every
  site**, grouped by site, with filters, search, export/import, and **bulk actions** —
  tick rows (or a whole site) and mark them unread, read, favorite, unfavorite, or delete.
- **Deleting only happens on the manage page.** The popup can mark and star but never
  remove, so a crowded list can't lose an entry to a stray click.
- The background service worker keeps the icon in sync and answers the content script's
  lookups. It's fully event-driven (tab and storage events) — no polling, no alarms. The
  icons are **drawn at runtime** with `OffscreenCanvas` rather than shipped as PNGs: there
  are only six combinations, and generating them keeps the colours defined once.

### Where it's kept

Each entry is **its own key** in `chrome.storage.local`, named `e:<normalised URL>`. That
matters more than it sounds: marking a page writes ~200 bytes, instead of rewriting the
whole store the way a single `entries` blob would. The cost is that listing everything
reads all keys at once, which is fine — reads are cheap and the popup needs the whole site
anyway.

State is local (not `chrome.storage.sync`) and survives restarts — sync caps out at 100 KB
total, 8 KB per item and 512 items, so it could never hold this; export/import is the
cross-device path instead. A store from an earlier build that used one `entries` object is
split into per-entry keys automatically on first read, and one written while favourite was
briefly a status of its own has those entries turned back into starred-with-no-read-state.

### How much will it hold?

`chrome.storage.local` allows **10 MB** by default (5 MB on Chrome 113 and earlier), counted
as the JSON of every value plus the length of every key. Measured against real entries —
including long non-ASCII titles, which cost 3 bytes a character in UTF-8 — an entry averages
**around 350 bytes**, with the longest seen at ~600.

That is roughly **29,000 marked pages** on the default quota: about eight years at ten marks
a day. Even so, the store only ever grows, so the manifest asks for **`unlimitedStorage`**,
which removes the cap entirely. What's left is the disk.

The manage page shows the current size next to the totals, so growth is visible rather than
a mystery. If it ever does become large, the thing that bites first is not the quota but
`getEntries()` deserialising every entry each time the popup opens — at which point the fix
is to read per-site rather than everything, not to delete data.

A write that fails — quota exceeded, or a full disk — **rejects rather than silently
dropping data**, and the popup and import both say so instead of leaving a click that
appears to have done nothing. Deletes never need space, so there is always a way back.

## The marker on saved links

`marker.js` runs on every `http(s)` page but is **inert until you turn it on** — the toggle
lives on the manage page under **On-page marker**, is off by default, and while off the
script only listens for the flag and touches nothing.

When on, it puts a dot on every link pointing at a page you have marked: **blue for unread,
grey for read**, with a **gold ring** when it's a favourite — the same language the toolbar
icon uses. A debounced `MutationObserver` catches links added later (infinite scroll, SPA
navigation), and any change re-marks open pages immediately.

The dots are **read-only** — `pointer-events: none`, and the content script has no way to
write. A dot sits _inside_ its link on pages you are clicking through quickly, so anything
interactive there is a way to rewrite a mark by accident. Marking is the popup's job. The
worker only answers `checkLinks`; it accepts no write messages at all, so nothing running
in a page can change a status even if it tried.

The comparison uses `urlKey()` from [`common.js`](common.js). Normalisation lives **only**
in the service worker — the content script sends hrefs and gets back state — so there is
one definition of "the same page".

Because the content script is declared for `http://*/*` and `https://*/*`, Brave asks for
read access to all sites at install time.

### Bulk actions

Every row on the manage page has a checkbox, and each site heading has one that takes the
whole group (shown half-ticked when only some of its rows are selected). With anything
selected, the bar above the list turns on: **Unread**, **Read**, **★ Favorite**,
**Unfavorite**, **Delete**.

Two rules keep it from doing more than it looks like it will:

- **The selection is always what's on screen.** Changing the filter or the search clears it,
  so an action can never reach a row you can't see. The bar states the count outright.
- **Unfavorite warns before it deletes.** A favourite with no read state has nothing left
  once the star is gone, so it disappears — the same rule a single unstar follows. If any of
  the selected rows are in that position, it says how many and asks first.

However many rows are selected, a bulk change is **one read and one write** (`updateEntries`
in [`common.js`](common.js)), not one per row.

## Export format

**Export** in the manage page downloads the whole store — all sites — as
`site-marker-<YYYY-MM-DD>.ndjson`. It is [NDJSON](https://github.com/ndjson/ndjson-spec):
a **header line** describing the file, then one line per entry in URL-key order.

One entry per line is chosen for git — commit an export and each mark is its own line, so a
newly marked page is a one-line insertion that leaves its neighbours untouched instead of
reshuffling an array (and without the trailing-comma edit a JSON array would force on the
line above).

```
{"format":"site-marker","version":4,"exportedAt":"2026-08-12T09:12:33.401Z","counts":{"sites":12,"total":84,"unread":30,"read":54,"favorite":9}}
{"url":"https://example.com/article","title":"Some article","status":"unread","favorite":true,"addedAt":"2026-05-02T18:20:00.000Z","updatedAt":"2026-06-11T07:03:12.000Z"}
{"url":"https://example.com/other","title":"Another","status":"read","addedAt":"2026-05-04T10:00:00.000Z","updatedAt":"2026-05-09T21:14:02.000Z"}
```

`favorite` is omitted when false — it would otherwise be noise on almost every line. The
second entry above isn't starred. `addedAt` is when the page was first marked and
`updatedAt` when it last changed; there are no per-status timestamps. `host`/`domain` are
left out entirely, since both derive from the URL.

**Import** matches on URL, merges newest-wins by `updatedAt`, and offers Replace as an
explicit choice. It accepts three shapes:

- this format — a header line, then entries;
- **headerless NDJSON**, nothing but entry lines. This is what the per-site shard files
  written by the short-lived folder-sync feature look like, so those aren't stranded;
- **version 3**, from the build where favourite was briefly a status of its own. Those
  entries become starred again with no read state;
- **version 2**, which already had the flag, and survives whole;
- **version 1** exports, the single JSON object earlier builds produced.

Bookmark Plus exports are a different format and are **not** accepted.

A title containing a newline, tab or quote is safe — `JSON.stringify` escapes it, so one
entry is always exactly one line.

Two URLs are the same page when they agree after dropping the `#` fragment, a leading
`www.` and a trailing slash (`urlKey()`). The query string still counts, and the path
stays case-sensitive.

## Install (load unpacked)

1. Open `brave://extensions` (or `chrome://extensions`).
2. Toggle **Developer mode** on (top-right).
3. Click **Load unpacked** and select this folder.
4. Pin the extension, open a site, and mark it.

For personal use — no need to publish it.

## Tuning

Most knobs are the `CONFIG` block at the top of [`common.js`](common.js):

- `MATCH` (default `'domain'`) — `'domain'` treats `docs.example.com` and `example.com` as
  the same site; `'host'` requires an exact hostname match. A leading `www.` is ignored
  either way.
- `SORT` (default `'oldest'`) — order the popup's list by when a page was first marked.

The link dot's size and colours are in [`marker.css`](marker.css), and the toolbar icon's
in the `ICON` block at the top of [`background.js`](background.js) — keep the two in step,
since they are meant to read as the same language. The on-page toggle is a per-profile setting
(`annotateLinks` in `chrome.storage.local`), not a `CONFIG` knob.

## Limitations

- **`http(s)` only.** On `brave://`, `file://` or the new tab page there is nothing to
  mark, and the popup says so.
- **Nothing leaves the browser on its own.** Marks live in the profile until you export
  them; there is no automatic file or cloud copy. Export before wiping a profile.
- **`unlimitedStorage` lifts the quota, not physics.** A full disk still fails the write —
  loudly, but it fails.
- **Domain detection is a short suffix list.** `registrableDomain()` knows the common
  two-label suffixes (`co.uk`, `com.au`, `co.th`, …) and otherwise assumes the last two
  labels. Not the full Public Suffix List — add an entry if some site you use groups
  wrongly.
- **Titles are captured when you mark**, and refreshed whenever you mark the same page
  again. They don't update on their own if the page's title later changes.
- **A field-level change rewrites a whole line** in an export, since an entry is one line.
  That's the trade NDJSON makes for clean one-line insertions; `git diff --word-diff` shows
  the field that actually moved.
- **Link dots are whole-URL, not per-site.** A link is dotted only if that exact page is
  marked (modulo `#fragment`, `www.` and a trailing slash) — the popup's looser domain
  matching doesn't apply there.
- **Link dots skip iframes** and any link whose href isn't `http(s)`.
- **A corner dot can be clipped** by a link inside a container with `overflow: hidden`,
  and on a link that wraps across lines it lands on the first line's corner. Reduce the
  overhang in [`marker.css`](marker.css) (the `transform: translate(...)`) if that bites.
- **Reloading the extension orphans the marker in tabs that are already open.** Chrome
  gives those content scripts no runtime to talk to, and `chrome.*` calls then throw
  synchronously (`Extension context invalidated`). `marker.js` detects this and tears
  itself down — dots removed, observers disconnected — rather than throwing on
  every DOM mutation. **Reload the tab** to get the marker back. This only happens while
  developing; a normal browsing session never sees it.

## File structure

```
site-marker/
  manifest.json   # MV3; popup, module service worker, content script
  common.js       # CONFIG, URL normalisation, the entry store, export/import
  background.js   # toolbar icon per page state, link lookups, change broadcasts
  marker.js       # read-only dots on links pointing at marked pages
  marker.css      # the link dot
  popup.html      # popup markup
  popup.js        # current-page controls, per-site tabs and list
  manage.html     # all-sites list, filters, import/export
  manage.js       # grouping, filtering, file drop/pick
  ui.css          # styling for both pages (light + dark)
  icons.js        # inline SVG icons for the buttons
  README.md       # this file
```
