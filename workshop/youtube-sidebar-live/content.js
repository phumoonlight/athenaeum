/* =============================================================================
 * YouTube Live Watchlist  (in-page floating button)
 * -----------------------------------------------------------------------------
 * You maintain a manual list of channels to follow. When you open YouTube, the
 * extension checks each one's live status and shows the live ones in a
 * bottom-left floating panel.
 *
 * Live detection (inspired by another extension's approach):
 *   fetch "https://www.youtube.com/<channel>/live" and count `"isLive": true`
 *   in the returned HTML —
 *     2  → live now
 *     1  → scheduled / upcoming stream (not live)
 *     0  → offline
 *
 * Design choices:
 *   - Same-origin fetch from the YouTube tab → uses your login cookies, needs no
 *     host permissions, and is unlikely to be blocked.
 *   - Checks ONLY when you open YouTube (once per page load) + a manual Refresh
 *     button. No background polling — nothing runs when YouTube isn't open.
 * ========================================================================== */

;(() => {
  'use strict'

  /* === Config ============================================================== */
  const CONFIG = {
    DEBUG: false, // set true for console logging
    FAB_ID: 'yls-fab',
    PANEL_ID: 'yls-panel',
    CHANNELS_KEY: 'yls_channels', // SYNC: array of channel ids (membership only)
    WATCHLIST_KEY: 'yls_watchlist', // LOCAL: array of full entries { url, name }
    RESULTS_KEY: 'yls_results', // LOCAL: cache of last check, url -> result
    LAST_REFRESH_KEY: 'yls_last_refresh', // LOCAL: timestamp of last check
    LIVE_COUNT: 2, // number of `"isLive": true` that means "live now"
    CONCURRENCY: 4, // max simultaneous /live fetches (be gentle)
    CHECK_ON_LOAD: true, // auto-check when YouTube opens (subject to TTL below)
    REFRESH_TTL_MS: 5 * 60 * 1000, // skip auto-check if cache is newer than this
  }

  const log = (...a) => {
    if (CONFIG.DEBUG) console.log('[YT-Live]', ...a)
  }
  const warn = (...a) => console.warn('[YT-Live]', ...a)

  /* === State =============================================================== */
  let watchlist = [] // [{ url, name }]
  let results = {} // url -> { isLive, name, watchUrl, avatar, error, ts }
  let lastRefresh = 0 // timestamp (ms) of the last completed check
  let panelOpen = false
  let settingsOpen = false // panel shows the settings (add/remove) view
  let checking = false

  /* ===========================================================================
   * Storage
   * ---------------------------------------------------------------------------
   * Split by purpose:
   *   - SYNC  holds ONLY the channel ids (membership) — tiny and rarely written,
   *           so it follows you across signed-in Chrome devices.
   *   - LOCAL holds the full entries ({ url, name }), the results cache and the
   *           last-refresh time — larger / rewritten often / device-specific.
   * On another device the synced ids rebuild the list; names/avatars fill in
   * from that device's own checks. Falls back to local if sync is unavailable.
   * ======================================================================== */
  function area(name) {
    try {
      return (chrome.storage && chrome.storage[name]) || null
    } catch (_) {
      return null
    }
  }
  const SYNC = area('sync') || area('local')
  const LOCAL = area('local')

  function areaGet(store, keys) {
    return new Promise((resolve) => {
      try {
        store.get(keys, (v) => resolve(v || {}))
      } catch (_) {
        resolve({})
      }
    })
  }
  function areaSet(store, obj) {
    return new Promise((resolve) => {
      try {
        store.set(obj, () => {
          // Surface (but don't throw on) quota / rate-limit errors.
          if (chrome.runtime && chrome.runtime.lastError) {
            warn('storage error:', chrome.runtime.lastError.message)
          }
          resolve()
        })
      } catch (_) {
        resolve()
      }
    })
  }

  /** A compact, stable channel id from a channel URL: "@handle" or
   *  "channel/UC…". This is what we keep in sync storage. */
  function idOf(url) {
    const m = (url || '').match(/(@[^/?#]+|channel\/UC[\w-]+)/)
    return m ? m[1] : url || ''
  }
  /** Rebuild a channel URL from a stored id. */
  function urlFromId(id) {
    if (!id) return ''
    if (/^https?:/i.test(id)) return id
    return 'https://www.youtube.com/' + String(id).replace(/^\/+/, '')
  }

  /** Merge a list of channel ids with whatever local detail we have, producing
   *  full { url, name } entries (minimal placeholders for unknown ids). */
  function buildWatchlist(ids, localEntries) {
    const byId = new Map((localEntries || []).map((e) => [idOf(e.url), e]))
    return ids.map((id) => byId.get(id) || { url: urlFromId(id), name: '' })
  }

  async function loadState() {
    const [sy, lo] = await Promise.all([
      areaGet(SYNC, [CONFIG.CHANNELS_KEY]),
      areaGet(LOCAL, [CONFIG.WATCHLIST_KEY, CONFIG.RESULTS_KEY, CONFIG.LAST_REFRESH_KEY]),
    ])

    const localEntries = Array.isArray(lo[CONFIG.WATCHLIST_KEY]) ? lo[CONFIG.WATCHLIST_KEY] : []

    let ids
    let migrate = false
    if (Array.isArray(sy[CONFIG.CHANNELS_KEY])) {
      ids = sy[CONFIG.CHANNELS_KEY] // sync is the source of truth for membership
    } else if (localEntries.length) {
      ids = localEntries.map((e) => idOf(e.url)) // legacy local-only → migrate up
      migrate = true
    } else {
      ids = []
    }

    watchlist = buildWatchlist(ids, localEntries)
    results =
      lo[CONFIG.RESULTS_KEY] && typeof lo[CONFIG.RESULTS_KEY] === 'object'
        ? lo[CONFIG.RESULTS_KEY]
        : {}
    lastRefresh = Number(lo[CONFIG.LAST_REFRESH_KEY]) || 0

    if (migrate) {
      log('Seeding sync channel ids from local watchlist.')
      await saveChannels()
    }
    // Only rewrite local detail if synced membership actually differs from what
    // local already had (e.g. a channel added on another device).
    const localIds = localEntries.map((e) => idOf(e.url))
    const sameMembership =
      ids.length === localIds.length && ids.every((id) => localIds.includes(id))
    if (!sameMembership) await saveDetail()
  }

  // Membership → sync (ids only); detail/cache → local.
  const saveChannels = () => areaSet(SYNC, { [CONFIG.CHANNELS_KEY]: watchlist.map((e) => idOf(e.url)) })
  const saveDetail = () => areaSet(LOCAL, { [CONFIG.WATCHLIST_KEY]: watchlist })
  const saveWatchlist = () => Promise.all([saveChannels(), saveDetail()]) // membership change
  const saveResults = () => areaSet(LOCAL, { [CONFIG.RESULTS_KEY]: results })
  const saveLastRefresh = () => areaSet(LOCAL, { [CONFIG.LAST_REFRESH_KEY]: lastRefresh })

  /* ===========================================================================
   * Channel input parsing
   * ---------------------------------------------------------------------------
   * Accepts: a full channel URL, a /@handle, a bare @handle, a bare handle, a
   * UC… channel id, or a /channel/UC… path. Returns { url, liveUrl } or null.
   * ======================================================================== */
  function parseChannelInput(raw) {
    let s = (raw || '').trim()
    if (!s) return null

    // If a full URL was pasted, reduce it to its path.
    if (/^https?:\/\//i.test(s)) {
      try {
        s = new URL(s).pathname
      } catch (_) {
        return null
      }
    }
    s = s.replace(/^\/+/, '') // drop leading slashes

    let path = null
    let m
    if (/^UC[\w-]{10,}$/.test(s)) path = `/channel/${s}`
    else if ((m = s.match(/^channel\/(UC[\w-]+)/))) path = `/channel/${m[1]}`
    else if ((m = s.match(/^(@[\w.\-]+)/))) path = `/${m[1]}`
    else if (/^[\w.\-]+$/.test(s))
      path = `/@${s}` // bare word → treat as handle
    else return null

    const url = 'https://www.youtube.com' + path
    return { url, liveUrl: url + '/live' }
  }

  /* ===========================================================================
   * Live detection (the example.js technique)
   * ======================================================================== */
  function jsonStr(raw) {
    try {
      return JSON.parse('"' + raw + '"')
    } catch (_) {
      return raw
    }
  }
  function extractName(html) {
    let m = html.match(/"author":"((?:[^"\\]|\\.)*)"/)
    if (m) return jsonStr(m[1])
    m = html.match(/"ownerChannelName":"((?:[^"\\]|\\.)*)"/)
    if (m) return jsonStr(m[1])
    m = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i)
    if (m) return m[1]
    return null
  }
  function extractAvatar(html) {
    // The FIRST "avatar" in the HTML is the masthead/account avatar (the logged-
    // in user's own picture), so we must anchor to channel-specific keys instead.
    const url = '((?:[^"\\\\]|\\\\.)*?)'
    const patterns = [
      // Channel page (offline): channelMetadataRenderer.avatar
      new RegExp(
        '"channelMetadataRenderer":\\{[\\s\\S]{0,4000}?"avatar":\\{"thumbnails":\\[\\{"url":"' +
          url +
          '"'
      ),
      // Live watch page: the video owner's avatar
      new RegExp('"videoOwnerRenderer":\\{[\\s\\S]{0,4000}?"thumbnails":\\[\\{"url":"' + url + '"'),
      // New view-model channel header (decoratedAvatarViewModel)
      new RegExp(
        '"pageHeaderViewModel":\\{[\\s\\S]{0,8000}?"image":\\{"sources":\\[\\{"url":"' + url + '"'
      ),
    ]
    for (const re of patterns) {
      const m = html.match(re)
      if (m) return jsonStr(m[1])
    }
    return null
  }

  /**
   * Check one watchlist entry. Returns a result object (never throws):
   *   { isLive, name, watchUrl, avatar, ts } or { error: 'login' | 'network', ts }
   */
  async function checkOne(entry) {
    const liveUrl = entry.liveUrl || entry.url + '/live'
    try {
      const res = await fetch(liveUrl, { redirect: 'follow', credentials: 'include' })
      const finalUrl = res.url || liveUrl

      // Redirected to a consent/login wall → can't determine status.
      if (/consent\.youtube\.com|accounts\.google\.com/.test(finalUrl)) {
        return { error: 'login', ts: Date.now() }
      }

      const html = await res.text()
      const count = (html.match(/"isLive":\s*true/g) || []).length
      const isLive = count >= CONFIG.LIVE_COUNT

      return {
        isLive,
        name: entry.name || extractName(html) || handleFromUrl(entry.url),
        avatar: extractAvatar(html) || results[entry.url]?.avatar || null,
        watchUrl: isLive ? finalUrl : entry.url,
        ts: Date.now(),
      }
    } catch (e) {
      log('checkOne failed for', entry.url, e)
      return { error: 'network', ts: Date.now() }
    }
  }

  function handleFromUrl(url) {
    try {
      const p = new URL(url).pathname.replace(/^\/+/, '')
      return p.split('/')[0] || url
    } catch (_) {
      return url
    }
  }

  /** Check every watchlist entry, with bounded concurrency. */
  async function checkAll() {
    if (checking || watchlist.length === 0) {
      renderAll()
      return
    }
    checking = true
    renderAll()
    try {
      const queue = watchlist.slice()
      const worker = async () => {
        while (queue.length) {
          const entry = queue.shift()
          const r = await checkOne(entry)
          results[entry.url] = r
          // Remember a freshly-discovered name on the entry for future loads.
          if (!entry.name && r.name) {
            entry.name = r.name
          }
          renderAll()
        }
      }
      const n = Math.min(CONFIG.CONCURRENCY, queue.length)
      await Promise.all(Array.from({ length: n }, worker))
      lastRefresh = Date.now()
      // Names discovered during the check are detail only — write local, not sync.
      await Promise.all([saveResults(), saveDetail(), saveLastRefresh()])
      log('checkAll complete:', summarize())
    } finally {
      checking = false
      renderAll()
    }
  }

  function summarize() {
    const live = watchlist.filter((e) => results[e.url]?.isLive).length
    return `${live}/${watchlist.length} live`
  }

  /* ===========================================================================
   * Watchlist mutations
   * ======================================================================== */
  async function addChannel(rawInput) {
    const parsed = parseChannelInput(rawInput)
    if (!parsed) {
      warn('Could not parse channel input:', rawInput)
      return false
    }
    if (watchlist.some((e) => idOf(e.url) === idOf(parsed.url))) return false // dupe
    // The in-memory entry keeps full detail (local); only its id goes to sync.
    const entry = { url: parsed.url, name: '' }
    watchlist.push(entry)
    await saveWatchlist() // membership changed → sync ids + local detail
    renderAll()
    // Check just this one immediately for instant feedback.
    results[entry.url] = await checkOne(entry)
    if (!entry.name && results[entry.url].name) entry.name = results[entry.url].name
    await Promise.all([saveResults(), saveDetail()]) // name is detail → local only
    renderAll()
    return true
  }

  async function removeChannel(url) {
    watchlist = watchlist.filter((e) => e.url !== url)
    delete results[url]
    await Promise.all([saveWatchlist(), saveResults()])
    renderAll()
  }

  /* ===========================================================================
   * Floating button + panel UI
   * ======================================================================== */
  function el(tag, className, text) {
    const e = document.createElement(tag)
    if (className) e.className = className
    if (text != null) e.textContent = text
    return e
  }

  function ensureFab() {
    let fab = document.getElementById(CONFIG.FAB_ID)
    if (fab) return fab
    fab = el('button', null)
    fab.id = CONFIG.FAB_ID
    fab.type = 'button'
    fab.setAttribute('aria-label', 'Live watchlist')
    fab.appendChild(el('span', 'yls-fab-dot'))
    fab.appendChild(el('span', 'yls-fab-icon', '📡'))
    fab.appendChild(el('span', 'yls-fab-count', '0'))
    fab.addEventListener('click', (e) => {
      e.stopPropagation()
      setPanelOpen(!panelOpen)
    })
    document.addEventListener('click', (e) => {
      if (
        panelOpen &&
        !e.target.closest('#' + CONFIG.PANEL_ID) &&
        !e.target.closest('#' + CONFIG.FAB_ID)
      ) {
        setPanelOpen(false)
      }
    })
    document.body.appendChild(fab)
    return fab
  }

  function ensurePanel() {
    let panel = document.getElementById(CONFIG.PANEL_ID)
    if (panel) return panel
    panel = el('div')
    panel.id = CONFIG.PANEL_ID
    panel.hidden = true
    // Keep clicks inside the panel from reaching the document "click outside"
    // handler. Without this, a control that re-renders the panel (e.g. Refresh)
    // detaches its own button mid-click, so the outside-check misreads it as a
    // click outside and closes the panel. (Links still navigate — this only
    // stops propagation, not the default action.)
    panel.addEventListener('click', (e) => e.stopPropagation())
    document.body.appendChild(panel)
    return panel
  }

  function setPanelOpen(open) {
    panelOpen = open
    if (open) settingsOpen = false // always (re)open on the main view
    const panel = document.getElementById(CONFIG.PANEL_ID)
    const fab = document.getElementById(CONFIG.FAB_ID)
    if (panel) panel.hidden = !open
    if (fab) fab.classList.toggle('yls-open', open)
    if (open) renderPanel() // make sure it's current when opened
  }

  function renderFab() {
    const fab = ensureFab()
    const liveCount = watchlist.filter((e) => results[e.url]?.isLive).length
    fab.querySelector('.yls-fab-count').textContent = String(liveCount)
    fab.classList.toggle('yls-has-live', liveCount > 0)
    fab.classList.toggle('yls-checking', checking)
  }

  function statusOf(entry) {
    const r = results[entry.url]
    if (checking && !r) return 'checking'
    if (!r) return 'unknown'
    if (r.error) return r.error // 'login' | 'network'
    return r.isLive ? 'live' : 'offline'
  }

  /** Human-friendly "time ago" for the last-refresh line. */
  function relTime(ts) {
    if (!ts) return 'never'
    const s = Math.floor((Date.now() - ts) / 1000)
    if (s < 60) return 'just now'
    const m = Math.floor(s / 60)
    if (m < 60) return `${m} min ago`
    const h = Math.floor(m / 60)
    if (h < 24) return `${h} hr ago`
    const d = Math.floor(h / 24)
    return `${d} day${d > 1 ? 's' : ''} ago`
  }

  /** Small icon button for the header (gear / back). */
  function iconButton(glyph, title, onClick) {
    const b = el('button', 'yls-iconbtn', glyph)
    b.type = 'button'
    b.title = title
    b.setAttribute('aria-label', title)
    b.addEventListener('click', onClick)
    return b
  }

  function renderPanel() {
    const panel = ensurePanel()
    panel.innerHTML = ''
    if (settingsOpen) renderSettingsView(panel)
    else renderMainView(panel)
  }

  /* --- Main view: one unified list, live channels on top ------------------ */
  function renderMainView(panel) {
    const header = el('div', 'yls-panel-header')
    const liveCount = watchlist.filter((e) => results[e.url]?.isLive).length
    header.appendChild(
      el('span', 'yls-title', liveCount ? `🔴 Live now · ${liveCount}` : 'Live watchlist')
    )
    const actions = el('div', 'yls-header-actions')
    const refresh = iconButton('⟳', 'Refresh', () => checkAll())
    refresh.classList.toggle('yls-spin', checking)
    refresh.disabled = checking || watchlist.length === 0
    actions.appendChild(refresh)
    actions.appendChild(
      iconButton('⚙', 'Settings', () => {
        settingsOpen = true
        renderPanel()
      })
    )
    header.appendChild(actions)
    panel.appendChild(header)

    /* Last-refresh line */
    panel.appendChild(
      el(
        'div',
        'yls-updated',
        checking ? 'Checking…' : lastRefresh ? `Updated ${relTime(lastRefresh)}` : 'Not checked yet'
      )
    )

    if (watchlist.some((e) => results[e.url]?.error === 'login')) {
      panel.appendChild(el('div', 'yls-warn', 'Log in to YouTube to check live status.'))
    }

    /* One list — live channels first (stable), the rest faded but readable. */
    const list = el('div', 'yls-section')
    if (watchlist.length === 0) {
      list.appendChild(el('div', 'yls-panel-empty', 'Open ⚙ Settings to add a channel.'))
    } else {
      const sorted = watchlist
        .map((entry, i) => [entry, i])
        .sort(
          (a, b) =>
            (statusOf(a[0]) === 'live' ? 0 : 1) - (statusOf(b[0]) === 'live' ? 0 : 1) || a[1] - b[1]
        )
        .map(([entry]) => entry)
      for (const entry of sorted) list.appendChild(channelRow(entry, 'main'))
    }
    panel.appendChild(list)
  }

  /* --- Settings view: add + remove channels ------------------------------- */
  function renderSettingsView(panel) {
    const header = el('div', 'yls-panel-header')
    const actions = el('div', 'yls-header-actions')
    actions.appendChild(
      iconButton('‹', 'Back', () => {
        settingsOpen = false
        renderPanel()
      })
    )
    header.appendChild(actions)
    header.appendChild(el('span', 'yls-title', 'Settings'))
    panel.appendChild(header)

    /* Add row */
    const addRow = el('div', 'yls-addrow')
    const input = el('input', 'yls-input')
    input.type = 'text'
    input.placeholder = '@handle, channel URL, or UC… id'
    const addBtn = el('button', 'yls-add', '＋')
    addBtn.type = 'button'
    addBtn.title = 'Add channel'
    addBtn.setAttribute('aria-label', 'Add channel')
    const submit = async () => {
      const val = input.value
      input.value = ''
      const ok = await addChannel(val)
      if (!ok) {
        input.value = val
        input.classList.add('yls-input-error')
        setTimeout(() => input.classList.remove('yls-input-error'), 1200)
      }
    }
    addBtn.addEventListener('click', submit)
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submit()
    })
    addRow.appendChild(input)
    addRow.appendChild(addBtn)
    panel.appendChild(addRow)

    /* Manage list with remove buttons */
    const manage = el('div', 'yls-section')
    manage.appendChild(el('div', 'yls-section-label', `Watchlist · ${watchlist.length}`))
    if (watchlist.length === 0) {
      manage.appendChild(el('div', 'yls-panel-empty', 'No channels yet — add one above.'))
    } else {
      for (const entry of watchlist) manage.appendChild(channelRow(entry, 'manage'))
    }
    panel.appendChild(manage)
  }

  /**
   * A single channel row.
   *   mode 'main'   → unified list row. Live rows link to the stream; non-live
   *                   rows are faded (via the yls-status-* class) but readable.
   *   mode 'manage' → status dot + ✕ remove button (settings watchlist).
   * Every row carries a status dot (red when live).
   */
  function channelRow(entry, mode) {
    const r = results[entry.url] || {}
    const status = statusOf(entry)
    // Only the main view links to the stream; settings rows are never links so a
    // mis-click while managing the list can't navigate you away.
    const asLink = mode === 'main' && status === 'live' && !!r.watchUrl

    const row = el(asLink ? 'a' : 'div', 'yls-row yls-status-' + status)
    if (asLink) row.href = r.watchUrl

    const avatar = el('img', 'yls-row-avatar')
    if (r.avatar) avatar.src = r.avatar
    avatar.alt = ''
    row.appendChild(avatar)

    row.appendChild(el('span', 'yls-row-name', r.name || entry.name || handleFromUrl(entry.url)))

    row.appendChild(el('span', 'yls-dot yls-dot-' + status))

    if (mode === 'manage') {
      const rm = el('button', 'yls-remove', '✕')
      rm.title = 'Remove'
      rm.addEventListener('click', (e) => {
        e.stopPropagation()
        removeChannel(entry.url)
      })
      row.appendChild(rm)
    }
    return row
  }

  function renderAll() {
    try {
      renderFab()
      if (panelOpen) renderPanel()
    } catch (e) {
      warn('render failed:', e)
    }
  }

  /** Reflect membership edits made on another device/tab (synced channel ids). */
  function watchSyncChanges() {
    try {
      chrome.storage.onChanged.addListener((changes, areaName) => {
        if (areaName !== 'sync' || !changes[CONFIG.CHANNELS_KEY]) return
        const ids = changes[CONFIG.CHANNELS_KEY].newValue
        if (!Array.isArray(ids)) return
        // Rebuild from synced ids, keeping any local detail we already have.
        watchlist = buildWatchlist(ids, watchlist)
        saveDetail() // persist the merged/pruned detail locally
        log('Membership updated from sync.')
        renderAll()
      })
    } catch (_) {
      // storage.onChanged unavailable — non-fatal.
    }
  }

  /* ===========================================================================
   * Init  (runs when the YouTube page loads; no background activity)
   * ======================================================================== */
  let didInit = false
  async function init() {
    if (didInit) return // content script persists across SPA nav; init once
    didInit = true
    try {
      await loadState()
      watchSyncChanges()
      ensureFab()
      ensurePanel()
      renderAll() // show cached results immediately

      // Auto-check on open ONLY if the cache is stale (older than the TTL).
      // Fresh cache → show it as-is; the user can still Refresh manually.
      const age = Date.now() - lastRefresh
      if (CONFIG.CHECK_ON_LOAD && watchlist.length && age >= CONFIG.REFRESH_TTL_MS) {
        checkAll()
      } else {
        log(`Using cached results (age ${Math.round(age / 1000)}s).`, summarize())
      }
    } catch (e) {
      warn('Init failed:', e)
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})()
