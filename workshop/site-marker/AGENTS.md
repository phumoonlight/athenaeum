# Site Marker — how it works

Everything about this extension that isn't the pitch. [`README.md`](README.md) is the short
about; this file is the design, the rules the code keeps, and the reasons behind both. Read
it before changing anything here.

## Working on it

- **No build step, no dependencies, no tests.** `package.json` exists only so node reads
  these files as ES modules — handy for importing `common.js` from a one-off script, and
  ignored by Chrome entirely. Load the folder unpacked and reload it after an edit.
- **Verify in the browser.** There is nothing else to check the work — reload the extension
  _and_ the tab, since a reload orphans content scripts already injected (see Limitations).
- **Formatting** comes from the repo root `.prettierrc`: no semicolons, single quotes,
  2-space indent, 100 columns.
- **The content script can't import ES modules.** `marker.js` therefore mirrors a few
  constants from `common.js` literally — the appearance setting keys and the clamp ranges.
  Change one and change the other; there is no import to keep them honest. Its own site's
  key is not mirrored: it asks the worker for it, since working it out needs
  `registrableDomain()`.

## Behaviour

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
- **The popup's header also carries the on-page marker's switch for the site you're on** —
  the button left of Manage, lit while the link dots are on there. It's the one control
  that is about the site rather than a page, which is why it sits by the site's name.
- Nothing in the popup returns a page to **unmarked**. To drop a page entirely, use the
  manage page.
- A page is recorded the moment you mark it, and **deleted once it has neither a read state
  nor a star** — so the store is exactly the set of pages you cared about. Visiting a site
  records nothing; there is no history tracking.
- **Manage** (the header button) opens a page split into two tabs: **Saved pages** —
  every marked page across every site, grouped by site, with filters, search and **bulk
  actions** (tick rows, or a whole site, and mark them unread, read, favorite, unfavorite,
  or delete) — and **Settings**, the knobs that aren't about any one page. They were one
  scroll before, which put a wall of settings between the header and the list every time
  you opened it to find something. Export and Import stay in the header, above both:
  they're the whole store, not either half, and the import panel opens above the tabs.
  Switching tabs leaves the hidden half's DOM alone, so a filter, a search and a selection
  survive a trip to the settings and back.
- **The current-page row can also forget the page**, with a third button that appears once
  it's marked. One click, no confirmation: it only ever touches the page in front of you,
  and re-marking is two clicks away.
- **The rows below can't delete.** A crowded list is the wrong place for it; use the row's
  buttons to change state, or the manage page to remove in bulk.
- The background service worker keeps the icon in sync and answers the content script's
  lookups. It's fully event-driven (tab and storage events) — no polling, no alarms. The
  icons are **drawn at runtime** with `OffscreenCanvas` rather than shipped as PNGs: there
  are only six combinations, and generating them keeps the colours defined once.

## Where it's kept

Everything in `chrome.storage.local` carries a prefix saying what it is: **`e:` for a
marked page**, keyed by its normalised URL, and **`app:` for a setting**
(`app:markerSize`, `app:markerOpacity`, `app:readOpacity`, and one
`app:annotate:<site>` per site the on-page marker is on for). Anything without a prefix is
left over from a build that has moved on, and gets migrated or removed on first read.

**Each entry having its own key** is the part that matters most: marking a page writes ~200
bytes, instead of rewriting the whole store the way a single `entries` blob would. The cost
is that listing everything reads all keys at once, which is fine — reads are cheap and the
popup needs the whole site anyway.

State is local (not `chrome.storage.sync`) and survives restarts — sync caps out at 100 KB
total, 8 KB per item and 512 items, so it could never hold this; export/import is the
cross-device path instead.

Older stores are brought up to date on first read, and the migration is idempotent, so a
current store is left untouched: one `entries` blob is split into per-entry keys, and
entries written while favourite was briefly a status of its own become
starred-with-no-read-state. Settings from removed features are dropped instead, in
`dropRemovedFeatureLeftovers()` — including the marker's old global switch, which no
per-site value could honestly be derived from.

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

`marker.js` runs on every `http(s)` page but is **inert until you turn it on for that
site** — the toggle is the leftmost button in the popup's header, next to the site's name,
and while off the script only listens for that site's flag and touches nothing.

**The switch is per site, and every site starts off.** The dots answer "have I been here
before" on the sites where you actually collect pages; on everything else they are noise
sitting inside someone else's links, and a global switch made the second group pay for the
first. A site is on while `app:annotate:<site>` exists, and turning it off deletes the key —
so the store holds exactly the sites you said yes to. The site is the same identity the
popup groups by (`siteKey()`), so under the default `MATCH: 'domain'` turning it on for
`docs.example.com` turns it on for `example.com` and every other subdomain.

**The popup is the only place that turns a site on**, because it is the only place that
knows which site you mean. The manage page's **Settings** tab, under **On-page marker**,
lists the sites it is on for as chips, and clicking one turns that site off — review and
undo from anywhere, without a text box for typing a domain in slightly wrong.

When on, it puts a dot on every link pointing at a page you have marked: **blue for unread,
grey for read**, with a **gold ring** when it's a favourite — the same language the toolbar
icon uses. A debounced `MutationObserver` catches links added later (infinite scroll, SPA
navigation), and any change re-marks open pages immediately.

The three appearance settings stay on the manage page's **Settings** tab and stay **global**
— they are how the dots look wherever they are on, not where they show up. **Dot size**:
8–28 pixels, default 16. Bigger is easier to spot on a busy page, smaller keeps the dots out
of dense text. The white ring scales with them.
**Dot opacity** is beside it: 10–100%, default 100 — turn it down to let a dot sit over a
page without hiding what is underneath. The floor is 10 rather than 0 because a dot you
cannot see is just the marker being off, and the site's toggle already does that. It is stored as a
whole percentage rather than a 0–1 fraction, which keeps both sliders and both clamps on
integers.

**Read link opacity** fades the link itself once it points at a page you have marked read:
20–100%, default 100, which leaves the page exactly as it styles its own links. What is
left at full strength is what you have not got to yet. The dot sits inside the link and
opacity applies to a whole subtree, so a faded link fades its dot with it — the right
reading of the setting, and not something CSS lets a descendant opt out of.

All three are CSS custom properties on the page root, so dragging a slider restyles every
dot and every faded link on every open tab at once — no rescan, nothing in the DOM touched
again. Links are tagged `.smk-read-link` when they are marked read whatever the setting
says, so changing it never means visiting them again.

`!important` throughout: these are our own spans sitting inside someone else's link, and a
site rule as ordinary as `a span { width: 4px }` is more specific than a single class, so
without it the page would decide how they look — and for the fade, a rule for a site's own
links beats ours just as easily. The fade is additionally gated behind a `.smk-dim-read`
class on the root, added only below 100%, so at the default the rule matches nothing at all
and a site that fades its own visited links keeps doing exactly that.

An earlier build had this fade under `app:readLinkOpacity`, holding a 0–1 fraction. That key
is deleted as a leftover on update, and the setting is back under a different name
(`app:readOpacity`), so a stale `0.5` can never be read as half a percent of one.

The dots are **read-only** — `pointer-events: none`, and the content script has no way to
write. A dot sits _inside_ its link on pages you are clicking through quickly, so anything
interactive there is a way to rewrite a mark by accident. Marking is the popup's job. The
worker only answers `checkLinks`; it accepts no write messages at all, so nothing running
in a page can change a status even if it tried.

The comparison uses `urlKey()` from [`common.js`](src/common.js). Normalisation lives **only**
in the service worker — the content script sends hrefs and gets back state — so there is
one definition of "the same page".

Because the content script is declared for `http://*/*` and `https://*/*`, Brave asks for
read access to all sites at install time.

## Bulk actions

Sites start **collapsed** — the page opens as a list of sites and their counts, not a wall
of pages. Click a site to open it; a text search opens whatever it matched, since a search
that hides its own results would be useless. The filter chips only narrow, so they leave
sites closed.

Every row has a checkbox, and each site heading has one that takes the whole group (shown
half-ticked when only some of its rows are selected). A site's checkbox works whether it is
open or not, so a whole site can be selected without expanding it. **Rows carry no
buttons of their own** — one page is just a selection of one, and a list this long is the
wrong place for a delete button you can hit by accident. With anything selected, the bar
above the list turns on: **Unread**, **Read**, **★ Favorite**,
**Unfavorite**, **Delete**.

Two rules keep it from doing more than it looks like it will:

- **The selection is always what's on screen.** Changing the filter or the search clears it,
  so an action can never reach a row you can't see. The bar states the count outright.
- **Unfavorite warns before it deletes.** A favourite with no read state has nothing left
  once the star is gone, so it disappears — the same rule a single unstar follows. If any of
  the selected rows are in that position, it says how many and asks first.

However many rows are selected, a bulk change is **one read and one write** (`updateEntries`
in [`common.js`](src/common.js)), not one per row.

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

Another tool's export is **not** accepted, however close it looks — quietly guessing at
someone else's shape is how you import nonsense. `parseExport()` throws with a readable
message instead. Converting such a file is a job for a throwaway script rather than for the
importer — and one that builds its output with the extension's own `exportText()`, so it
can't drift from whatever the current format is.

A title containing a newline, tab or quote is safe — `JSON.stringify` escapes it, so one
entry is always exactly one line.

Two URLs are the same page when they agree after dropping the `#` fragment, a leading
`www.` and a trailing slash (`urlKey()`). The query string still counts, and the path
stays case-sensitive.

## Tuning

Most knobs are the `CONFIG` block at the top of [`common.js`](src/common.js):

- `MATCH` (default `'domain'`) — `'domain'` treats `docs.example.com` and `example.com` as
  the same site; `'host'` requires an exact hostname match. A leading `www.` is ignored
  either way.
- `SORT` (default `'oldest'`) — order the popup's list by when a page was first marked.

The link dot's colours are in [`marker.css`](styles/marker.css) — its size and both opacities are
settings now — and the toolbar icon's are in the `ICON` block at the top of
[`background.js`](src/background.js). Keep the two in step, since they are meant to read as the
same language. The on-page marker's switch is per site (`app:annotate:<site>` in
`chrome.storage.local`), not a `CONFIG` knob — though `MATCH` decides what counts as one
site there too.

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
  overhang in [`marker.css`](styles/marker.css) (the `transform: translate(...)`) if that bites.
- **Reloading the extension orphans the marker in tabs that are already open.** Chrome
  gives those content scripts no runtime to talk to, and `chrome.*` calls then throw
  synchronously (`Extension context invalidated`). `marker.js` detects this and tears
  itself down — dots removed, observers disconnected — rather than throwing on
  every DOM mutation. **Reload the tab** to get the marker back. This only happens while
  developing; a normal browsing session never sees it.

## File structure

```
site-marker/
  manifest.json     # MV3; the only file that names paths, so it points at all three folders
  package.json      # marks the source as ES modules for anything run under node
  src/
    common.js       # CONFIG, URL normalisation, the entry store, export/import
    background.js   # toolbar icon per page state, link lookups, which site a tab is on
    marker.js       # read-only dots on links pointing at marked pages
    popup.js        # current-page controls, per-site tabs and list
    manage.js       # tabs, grouping, filtering, file drop/pick
    icons.js        # inline SVG icons for the buttons
  views/
    popup.html      # popup markup
    manage.html     # two tabs — the all-sites list and filters, and the settings
  styles/
    marker.css      # the link dot and the read-link fade, injected into every page
    ui.css          # styling for both views (light + dark)
  README.md         # the short about
  AGENTS.md         # this file
```

Paths cross a folder boundary in exactly four places, all of them declarations rather than
logic: `manifest.json` (the popup, the worker, and the content script's pair of files), the
`<link>` and `<script>` at the top of each view, and `getURL('views/manage.html')` in
[`popup.js`](src/popup.js). Everything else is a sibling import — `src/` only ever imports
from `src/`.
