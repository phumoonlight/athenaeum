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

const ANNOTATE_KEY = 'annotateLinks'

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

function makeMark(status) {
  const span = document.createElement('span')
  span.className = `${MARK_CLASS} ${MARK_CLASS}--${status}`
  span.title = status[0].toUpperCase() + status.slice(1)
  span.setAttribute('aria-hidden', 'true')
  return span
}

/**
 * The dot sits at the link's top-left corner, which needs the link itself to be
 * a positioning context. Only statically-positioned links are touched — anything
 * the page already positions is left exactly as the page set it.
 */
function markLink(link, status) {
  if (getComputedStyle(link).position === 'static') link.classList.add(HOST_CLASS)
  link.append(makeMark(status))
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
      link.setAttribute(SEEN_ATTR, states[i] || 'none')
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

function setEnabled(next) {
  if (orphaned || next === enabled) return
  enabled = next
  if (enabled) {
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
  if (area === 'local' && changes[ANNOTATE_KEY]) setEnabled(!!changes[ANNOTATE_KEY].newValue)
})

// Same synchronous-throw hazard as `send()`: if this script was injected into a
// tab that outlived an extension reload, `chrome.storage` is already gone.
try {
  chrome.storage.local.get(ANNOTATE_KEY).then(
    (stored) => setEnabled(!!stored[ANNOTATE_KEY]),
    () => teardown()
  )
} catch {
  teardown()
}
