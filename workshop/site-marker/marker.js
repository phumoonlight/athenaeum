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
const READ_OPACITY_KEY = 'app:readLinkOpacity'

const READ_CLASS = 'smk-read-link'
/** Both live on the page root; see `.smk-dim-read` in marker.css. */
const DIM_CLASS = 'smk-dim-read'
const OPACITY_VAR = '--smk-read-opacity'

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
}

/**
 * How much to fade links to pages already read. Set as a custom property on the
 * page root rather than on each link, so changing it restyles every dimmed link
 * at once — no rescan, no touching the DOM again.
 */
function setReadOpacity(value) {
  // Mirrors clampOpacity() in common.js. Empty values are checked before
  // `Number()` sees them: it turns `null` and `''` into 0, which would clamp an
  // unset setting to the faintest links rather than leaving them alone.
  const empty = value === null || value === undefined || value === ''
  const number = empty ? NaN : Number(value)
  const opacity = Number.isFinite(number) ? Math.min(1, Math.max(0.2, number)) : 1

  const root = document.documentElement
  root.style.setProperty(OPACITY_VAR, String(opacity))
  // The class is what arms the `!important` rule, so at 100% nothing overrides
  // the page — a site that fades its own links keeps doing so.
  root.classList.toggle(DIM_CLASS, opacity < 1)
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
  // Always tagged, even at full opacity — the variable does the work, so the
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
  document.documentElement.style.removeProperty(OPACITY_VAR)
  document.documentElement.classList.remove(DIM_CLASS)
}

function setEnabled(next) {
  if (orphaned || next === enabled) return
  enabled = next
  if (enabled) {
    // Turning the marker on mid-session needs the current value too.
    chrome.storage.local.get(READ_OPACITY_KEY).then(
      (stored) => setReadOpacity(stored[READ_OPACITY_KEY]),
      () => {}
    )
    observer ??= new MutationObserver(schedule)
    observer.observe(document.documentElement, { childList: true, subtree: true })
    schedule()
  } else {
    observer?.disconnect()
    clearTimeout(timer)
    clearMarks()
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
  if (changes[READ_OPACITY_KEY] && enabled) setReadOpacity(changes[READ_OPACITY_KEY].newValue)
  if (changes[ANNOTATE_KEY]) setEnabled(!!changes[ANNOTATE_KEY].newValue)
})

// Same synchronous-throw hazard as `send()`: if this script was injected into a
// tab that outlived an extension reload, `chrome.storage` is already gone.
try {
  chrome.storage.local.get([ANNOTATE_KEY, READ_OPACITY_KEY]).then((stored) => {
    if (stored[ANNOTATE_KEY]) setReadOpacity(stored[READ_OPACITY_KEY])
    setEnabled(!!stored[ANNOTATE_KEY])
  }, teardown)
} catch {
  teardown()
}
