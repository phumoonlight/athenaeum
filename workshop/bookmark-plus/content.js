// Dots links on the page that you've already bookmarked: blue for unread, grey
// for read. Off unless the popup's toggle is on — when off this script does
// nothing but watch the flag, so it costs a listener and no DOM work.
//
// URL normalisation deliberately lives in the background worker: this script
// sends hrefs over and gets back a status, so `urlKey()` in common.js stays the
// single definition of "the same bookmark".

const MARK_CLASS = 'bmpx-mark'
const HOST_CLASS = 'bmpx-host'
const SEEN_ATTR = 'data-bmpx'
const DEBOUNCE_MS = 300
const CHUNK = 400

let enabled = false
let observer = null
let timer = null

function makeMark(status) {
  const span = document.createElement('span')
  span.className = `${MARK_CLASS} ${MARK_CLASS}--${status}`
  span.title = status === 'read' ? 'Bookmarked — read' : 'Bookmarked — unread'
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
    let statuses // 'unread' | 'read' | null, one per link
    try {
      statuses = await chrome.runtime.sendMessage({
        type: 'checkLinks',
        urls: batch.map((link) => link.href),
      })
    } catch {
      return // extension reloaded or updating — try again on the next mutation
    }
    if (!Array.isArray(statuses) || !enabled) return
    batch.forEach((link, i) => {
      link.setAttribute(SEEN_ATTR, statuses[i] || 'none')
      if (statuses[i]) markLink(link, statuses[i])
    })
  }
}

function schedule() {
  clearTimeout(timer)
  timer = setTimeout(scan, DEBOUNCE_MS)
}

function clearMarks() {
  for (const mark of document.querySelectorAll(`.${MARK_CLASS}`)) mark.remove()
  for (const host of document.querySelectorAll(`.${HOST_CLASS}`)) host.classList.remove(HOST_CLASS)
  for (const link of document.querySelectorAll(`[${SEEN_ATTR}]`)) link.removeAttribute(SEEN_ATTR)
}

function setEnabled(next) {
  if (next === enabled) return
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

// A bookmark or a read mark changed — re-evaluate every link, not just new ones,
// since an existing dot may need to switch colour.
chrome.runtime.onMessage.addListener((message) => {
  if (message?.type === 'refreshMarks' && enabled) {
    clearMarks()
    schedule()
  }
})

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.annotateLinks) setEnabled(!!changes.annotateLinks.newValue)
})

chrome.storage.local.get('annotateLinks').then((stored) => setEnabled(!!stored.annotateLinks))
