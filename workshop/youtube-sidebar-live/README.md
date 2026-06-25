# YouTube Live Watchlist

A small, personal-use Chrome extension that adds a **floating button to the
bottom-left** of YouTube showing which of your **manually-followed channels are
live right now**. Click the button to see live channels and to manage your list.

It does **not** read your subscriptions and uses **no API key**. You curate a
small watchlist, and the extension checks each channel's live status by fetching
its `/live` page — **only when you open YouTube** (plus a manual Refresh). There
is no background polling, so nothing runs when YouTube isn't open.

## How it detects "live"

For each channel on your list it fetches `https://www.youtube.com/<channel>/live`
and counts how many times `"isLive": true` appears in the returned HTML:

| Count | Meaning |
|------:|---------|
| **2** | **Live now** |
| 1 | Scheduled / upcoming stream (not counted as live) |
| 0 | Offline |

(This heuristic is borrowed from another extension's approach.) The fetch is
**same-origin** — it runs from your open YouTube tab using your login cookies —
so it needs no host permissions and is unlikely to be rate-limited or blocked.

## Using it

1. Load it (see below) and open `https://www.youtube.com`.
2. Click the **📡 button** (bottom-left) to open the panel.
3. In the **Add** box at the bottom, paste any of:
   - `@handle` (or just the handle text, e.g. `MYROGaming`)
   - a channel URL (`https://www.youtube.com/@handle` or `/channel/UC…`)
   - a raw `UC…` channel id
4. The channel is added, checked immediately, and its name/avatar filled in.
5. Live channels appear at the top with a **LIVE** badge and link to the stream.
   Each watchlist row has a status dot (🔴 live / grey offline / amber checking)
   and an **✕** to remove it.
6. **Refresh** re-checks every channel. Checks also run once automatically each
   time you open/reload YouTube.

Storage is split by purpose:

- **Channel ids only → `chrome.storage.sync`** — just the membership list (e.g.
  `@handle` / `channel/UC…`), which is tiny and rarely written, so it follows
  you across signed-in Chrome devices and edits on one tab/device show up in
  others. (Falls back to local if sync is unavailable; a pre-existing local
  watchlist seeds the synced ids automatically.)
- **Full detail → `chrome.storage.local`** — the entries (`url`, cached `name`),
  the results cache, and the last-refresh time. Larger, rewritten on every
  check, and device-specific, so it stays local (and off sync's 8 KB-per-item /
  write-rate limits). On a new device the synced ids rebuild the list; names and
  avatars fill in from that device's own checks.

Both persist across sessions and show instantly on the next visit (before any
re-check).

## Install (load unpacked)

1. Open `chrome://extensions`.
2. Toggle **Developer mode** on (top-right).
3. Click **Load unpacked** and select this folder.
4. Open/refresh `https://www.youtube.com`; the 📡 button appears bottom-left.

For personal use — no need to publish it.

## Notes, tuning & limitations

All knobs are in the `CONFIG` block at the top of [`content.js`](content.js):

- `LIVE_COUNT` (default `2`) — how many `"isLive": true` hits mean "live". If
  YouTube changes how often that string appears and detection breaks, this is
  the first thing to adjust.
- `CONCURRENCY` (default `4`) — how many `/live` pages are fetched at once. Lower
  it if you have a large list and want to be gentler.
- `CHECK_ON_LOAD` (default `true`) — auto-check when YouTube opens. Set `false`
  to only check via the Refresh button.
- `REFRESH_TTL_MS` (default `5 min`) — on open, if the cached results are newer
  than this, the auto-check is skipped and the cache is shown as-is (the panel
  shows "Updated N min ago"). Manual **Refresh** always re-checks and resets the
  timer. This keeps repeated YouTube opens from re-fetching every time.
- `DEBUG` — set `true` to log check results to the console.

Limitations to be aware of:

- **Cost scales with list size.** Each check fetches one full HTML page per
  channel. Fine for a curated list of a few dozen; not meant for hundreds.
- **Login required.** If you're signed out (or hit a consent wall), checks can't
  read status and the panel shows *"Log in to YouTube to check live status."*
- **Heuristic, not official.** The `"isLive": true` count is a pragmatic trick,
  not a documented API, so it can need the occasional tweak (see `LIVE_COUNT`).

## File structure

```
youtube-live-sidebar/
  manifest.json   # MV3; one content script + "storage" permission
  content.js      # watchlist storage, /live checks, floating button + panel
  styles.css      # button + panel + management UI styling
  README.md       # this file
```

> `example.js` and `Untitled-1.json`, if present, are reference/sample files used
> while developing — they're not part of the extension and can be deleted.
