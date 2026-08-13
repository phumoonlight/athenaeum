# Site Marker

A small, personal-use Brave/Chrome extension. Mark **any page** as **unread**, **read**
or **★ favorite** — see that state on the toolbar icon and on every link pointing at it, and
find it again later. Marking is one click and always reversible.

**Site Marker owns its own store.** Nothing needs to be bookmarked first, and the extension
never reads or writes your browser bookmarks — it doesn't even ask for the permission.
Everything it knows lives in the browser profile; **export and import** are how it moves.

Marks are per page URL, grouped by site in the popup. A read state (`unread` / `read`) and a
★ favourite flag are separate questions, so a page can be both. The manage page lists
everything marked, everywhere, with search, filters, bulk actions and NDJSON export.

## Install (load unpacked)

1. Open `brave://extensions` (or `chrome://extensions`).
2. Toggle **Developer mode** on (top-right).
3. Click **Load unpacked** and select this folder.
4. Pin the extension, open a site, and mark it.

For personal use — no need to publish it.

## More

[`AGENTS.md`](AGENTS.md) has the rest: how it works, where state is kept, the on-page
marker and its settings, the export format, tuning, limitations and the file layout.
