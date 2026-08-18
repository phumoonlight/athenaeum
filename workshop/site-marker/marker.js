// The on-page half of Site Marker: a dot on every link pointing at a page you
// have marked. Read-only and `pointer-events: none` — it can never change a
// status, so a mistimed click on a busy page can't quietly rewrite your marks.
// Marking is the popup's job. The marker is **per site** and off until this
// site's toggle in the popup is on — while off this script only watches that
// site's flag and touches nothing.
//
// Everything goes through the service worker: this script sends URLs and gets
// back state, so `urlKey()` in common.js stays the only definition of "the same
// page" — and the same for which site this is, which decides the storage key
// below. Content scripts can't import ES modules, so the appearance keys are
// mirrored literally from common.js.

const MARKER_SIZE_KEY = 'app:markerSize'
const MARKER_OPACITY_KEY = 'app:markerOpacity'
const READ_OPACITY_KEY = 'app:readOpacity'

/** Set on the page root; see `.smk-mark` and `.smk-dim-read` in marker.css. */
const SIZE_VAR = '--smk-mark-size'
const OPACITY_VAR = '--smk-mark-opacity'
const READ_OPACITY_VAR = '--smk-read-opacity'

/** On the page root, and only below 100% — see `setReadOpacity()`. */
const DIM_CLASS = 'smk-dim-read'

const MARK_CLASS = 'smk-mark'
const READ_CLASS = 'smk-read-link'
const HOST_CLASS = 'smk-host'
const SEEN_ATTR = 'data-smk'
const DEBOUNCE_MS = 300
const CHUNK = 400

let enabled = false
/** This site's switch, named by the worker on startup — see the bottom of the file. */
let annotateKey = null
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
  clearStyling()
}

/**
 * Mirrors clampSetting() in common.js. Empty values are checked before
 * `Number()` sees them: it turns `null` and `''` into 0, which would clamp an
 * unset setting to the smallest dot rather than leaving it at the default.
 */
function clampSetting(value, min, max, fallback) {
  const empty = value === null || value === undefined || value === ''
  const number = empty ? NaN : Number(value)
  if (!Number.isFinite(number)) return fallback
  return Math.min(max, Math.max(min, Math.round(number)))
}

/**
 * How big the dots are. Set as a custom property on the page root rather than on
 * each dot, so changing it resizes every one at once — no rescan, no touching
 * the DOM again. Same for the opacity below.
 */
function setMarkerSize(value) {
  document.documentElement.style.setProperty(SIZE_VAR, `${clampSetting(value, 8, 28, 16)}px`)
}

/** Stored as a whole percentage (see common.js); CSS wants the 0–1 fraction. */
function setMarkerOpacity(value) {
  const percent = clampSetting(value, 10, 100, 100)
  document.documentElement.style.setProperty(OPACITY_VAR, String(percent / 100))
}

/**
 * How faded links to pages already read are. Also a root custom property, so the
 * links themselves are tagged once and never touched again when this changes.
 */
function setReadOpacity(value) {
  const percent = clampSetting(value, 20, 100, 100)
  const root = document.documentElement
  root.style.setProperty(READ_OPACITY_VAR, String(percent / 100))
  // The class is what arms the `!important` rule, so at 100% we match nothing
  // and a site that fades its own read links keeps doing exactly that.
  root.classList.toggle(DIM_CLASS, percent < 100)
}

/** The three appearance settings, read together and applied together. */
const STYLE_KEYS = [MARKER_SIZE_KEY, MARKER_OPACITY_KEY, READ_OPACITY_KEY]

function applyStyling(stored) {
  setMarkerSize(stored[MARKER_SIZE_KEY])
  setMarkerOpacity(stored[MARKER_OPACITY_KEY])
  setReadOpacity(stored[READ_OPACITY_KEY])
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
  // Tagged even at full opacity — the root variable does the fading, so the
  // setting can change without every link having to be visited again.
  if (state.status === 'read') link.classList.add(READ_CLASS)
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
  for (const el of document.querySelectorAll(`.${READ_CLASS}`)) el.classList.remove(READ_CLASS)
  for (const link of document.querySelectorAll(`[${SEEN_ATTR}]`)) link.removeAttribute(SEEN_ATTR)
}

/**
 * The sizes and opacities are settings, not marks, so they survive the
 * clear-and-rescan that follows every change to the store. Removing them there
 * meant marking any page silently reset every dot on screen to the defaults.
 * Which links are faded is a mark, though, so that class goes with `clearMarks()`.
 */
function clearStyling() {
  document.documentElement.style.removeProperty(SIZE_VAR)
  document.documentElement.style.removeProperty(OPACITY_VAR)
  document.documentElement.style.removeProperty(READ_OPACITY_VAR)
  document.documentElement.classList.remove(DIM_CLASS)
}

function setEnabled(next) {
  if (orphaned || next === enabled) return
  enabled = next
  if (enabled) {
    // Turning the marker on mid-session needs the current values too.
    chrome.storage.local.get(STYLE_KEYS).then(applyStyling, () => {})
    observer ??= new MutationObserver(schedule)
    observer.observe(document.documentElement, { childList: true, subtree: true })
    schedule()
  } else {
    observer?.disconnect()
    clearTimeout(timer)
    clearMarks()
    clearStyling()
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
  if (enabled) {
    if (changes[MARKER_SIZE_KEY]) setMarkerSize(changes[MARKER_SIZE_KEY].newValue)
    if (changes[MARKER_OPACITY_KEY]) setMarkerOpacity(changes[MARKER_OPACITY_KEY].newValue)
    if (changes[READ_OPACITY_KEY]) setReadOpacity(changes[READ_OPACITY_KEY].newValue)
  }
  // One key, this site's — a toggle on some other site changes a key we never
  // look at, so nothing here reacts to it.
  if (annotateKey && changes[annotateKey]) setEnabled(!!changes[annotateKey].newValue)
})

// Ask the worker which site this is: it replies with the key holding this site's
// switch and whether it's on. A page with no site to speak of (there is none
// here, since the script only runs on http(s)) gets a null key, and then nothing
// can ever turn the marker on — which is the right answer for a page that can't
// be marked either. `setEnabled()` reads the appearance settings itself.
//
// `send()` already survives the synchronous throw of an orphaned context; the
// catch covers a `chrome.*` that is gone entirely.
try {
  send({ type: 'siteAnnotate', url: location.href }).then((reply) => {
    if (!reply) return
    annotateKey = reply.key
    setEnabled(!!reply.enabled)
  })
} catch {
  teardown()
}
