// The on-page half of Site Marker: a dot on every link pointing at a page you
// have marked. Read-only and `pointer-events: none` — it can never change a
// status, so a mistimed click on a busy page can't quietly rewrite your marks.
// Marking is the popup's job. Off until the manage page's toggle is on — while
// off this script only watches the flag and touches nothing.
//
// Everything goes through the service worker: this script sends URLs and gets
// back state, so `urlKey()` in common.js stays the only definition of "the same
// page". Content scripts can't import ES modules, so the constant below is
// mirrored literally from common.js.

const ANNOTATE_KEY = 'app:annotateLinks'
const MARKER_SIZE_KEY = 'app:markerSize'

/** Set on the page root; see `.smk-mark` in marker.css. */
const SIZE_VAR = '--smk-mark-size'

const MARK_CLASS = 'smk-mark'
const HOST_CLASS = 'smk-host'
const SEEN_ATTR = 'data-smk'
const DEBOUNCE_MS = 300
const CHUNK = 400

let enabled = false
let observer = null
let timer = null
let orphaned = false // the extension was reloaded out from under this script

/**
 * Reloading or updating the extension leaves the content scripts already
 * injected into open tabs without a runtime to talk to. `sendMessage` then
 * throws **synchronously** — a `.catch()` on its result never sees it, so it
 * surfaces as an uncaught rejection in whichever async caller we were in
 * (typically `scan()`, once per mutation, which on a page like YouTube is a
 * lot).
 *
 * An orphaned script can never recover — only a page reload brings one back —
 * so the only sane response is to stop and leave the page as we found it.
 */
function send(message) {
  if (orphaned) return Promise.resolve(null)
  try {
    return chrome.runtime.sendMessage(message).catch(() => null)
  } catch {
    teardown()
    return Promise.resolve(null)
  }
}

/** Give up: stop watching, and remove everything we added to the page. */
function teardown() {
  orphaned = true
  enabled = false
  observer?.disconnect()
  observer = null
  clearTimeout(timer)
  clearMarks()
  clearSizing()
}

/**
 * How big the dots are. Set as a custom property on the page root rather than on
 * each dot, so changing it resizes every one at once — no rescan, no touching
 * the DOM again.
 */
function setMarkerSize(value) {
  // Mirrors clampMarkerSize() in common.js. Empty values are checked before
  // `Number()` sees them: it turns `null` and `''` into 0, which would clamp an
  // unset setting to the smallest dot rather than leaving it at the default.
  const empty = value === null || value === undefined || value === ''
  const number = empty ? NaN : Number(value)
  const size = Number.isFinite(number) ? Math.min(28, Math.max(8, Math.round(number))) : 16
  document.documentElement.style.setProperty(SIZE_VAR, `${size}px`)
}

function makeMark(state) {
  const status = state.status || 'marked'
  const span = document.createElement('span')
  span.className = `${MARK_CLASS} ${MARK_CLASS}--${status}${state.favorite ? ` ${MARK_CLASS}--fav` : ''}`
  span.title = `${status[0].toUpperCase()}${status.slice(1)}${state.favorite ? ' · favorite' : ''}`
  span.setAttribute('aria-hidden', 'true')
  return span
}

/**
 * The dot sits at the link's top-left corner, which needs the link itself to be
 * a positioning context. Only statically-positioned links are touched — anything
 * the page already positions is left exactly as the page set it.
 */
function markLink(link, state) {
  if (getComputedStyle(link).position === 'static') link.classList.add(HOST_CLASS)
  link.append(makeMark(state))
}

/** Links not looked at yet, ignoring anything that isn't a plain web link. */
function candidates() {
  const out = []
  for (const link of document.links) {
    if (link.hasAttribute(SEEN_ATTR)) continue
    if (!/^https?:$/i.test(link.protocol)) continue
    out.push(link)
  }
  return out
}

async function scan() {
  if (!enabled) return
  const links = candidates()
  if (!links.length) return

  for (let start = 0; start < links.length; start += CHUNK) {
    const batch = links.slice(start, start + CHUNK)
    const states = await send({ type: 'checkLinks', urls: batch.map((link) => link.href) })
    if (!Array.isArray(states) || !enabled) return
    batch.forEach((link, i) => {
      link.setAttribute(SEEN_ATTR, states[i]?.status || 'none')
      if (states[i]) markLink(link, states[i])
    })
  }
}

function schedule() {
  clearTimeout(timer)
  timer = setTimeout(scan, DEBOUNCE_MS)
}

function clearMarks() {
  for (const mark of document.querySelectorAll(`.${MARK_CLASS}`)) mark.remove()
  for (const el of document.querySelectorAll(`.${HOST_CLASS}`)) el.classList.remove(HOST_CLASS)
  for (const link of document.querySelectorAll(`[${SEEN_ATTR}]`)) link.removeAttribute(SEEN_ATTR)
}

/**
 * The size is a setting, not a mark, so it survives the clear-and-rescan that
 * follows every change to the store. Removing it there meant marking any page
 * silently reset every dot on screen back to the default size.
 */
function clearSizing() {
  document.documentElement.style.removeProperty(SIZE_VAR)
}

function setEnabled(next) {
  if (orphaned || next === enabled) return
  enabled = next
  if (enabled) {
    // Turning the marker on mid-session needs the current value too.
    chrome.storage.local.get(MARKER_SIZE_KEY).then(
      (stored) => setMarkerSize(stored[MARKER_SIZE_KEY]),
      () => {}
    )
    observer ??= new MutationObserver(schedule)
    observer.observe(document.documentElement, { childList: true, subtree: true })
    schedule()
  } else {
    observer?.disconnect()
    clearTimeout(timer)
    clearMarks()
    clearSizing()
  }
}

// A mark changed somewhere — re-evaluate every link, not just new ones, since an
// existing dot may need to change colour or disappear.
chrome.runtime.onMessage.addListener((message) => {
  if (message?.type === 'refreshMarks' && enabled) {
    clearMarks()
    schedule()
  }
})

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local') return
  if (changes[MARKER_SIZE_KEY] && enabled) setMarkerSize(changes[MARKER_SIZE_KEY].newValue)
  if (changes[ANNOTATE_KEY]) setEnabled(!!changes[ANNOTATE_KEY].newValue)
})

// Same synchronous-throw hazard as `send()`: if this script was injected into a
// tab that outlived an extension reload, `chrome.storage` is already gone.
try {
  chrome.storage.local.get([ANNOTATE_KEY, MARKER_SIZE_KEY]).then((stored) => {
    if (stored[ANNOTATE_KEY]) setMarkerSize(stored[MARKER_SIZE_KEY])
    setEnabled(!!stored[ANNOTATE_KEY])
  }, teardown)
} catch {
  teardown()
}
