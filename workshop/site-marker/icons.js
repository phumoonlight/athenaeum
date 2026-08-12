// Inline SVG icons, kept in one place so the buttons stay text-free but still
// carry a title/aria-label for what they do.

const NS = 'http://www.w3.org/2000/svg'

const PATHS = {
  check: ['m5 13 4 4L19 7'],
  undo: ['M4 10h10a5 5 0 0 1 0 10H9', 'm4 10 4-4', 'm4 10 4 4'],
  circle: ['M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16'],
  bookmark: ['M7 4h10a1 1 0 0 1 1 1v15l-6-4-6 4V5a1 1 0 0 1 1-1z'],
  eye: [
    'M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z',
    'M12 9.4a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2',
  ],
  star: ['m12 3.5 2.6 5.4 5.9.9-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9L4.5 9.8l5.9-.9z'],
  list: ['M8 6h12', 'M8 12h12', 'M8 18h12', 'M4 6h.01', 'M4 12h.01', 'M4 18h.01'],
  trash: ['M4 7h16', 'M9 7V5h6v2', 'm6 7 1 13h10l1-13', 'M10 11v6', 'M14 11v6'],
}

export function icon(name) {
  const svg = document.createElementNS(NS, 'svg')
  svg.setAttribute('viewBox', '0 0 24 24')
  svg.setAttribute('aria-hidden', 'true')
  svg.classList.add('icon')
  for (const d of PATHS[name]) {
    const path = document.createElementNS(NS, 'path')
    path.setAttribute('d', d)
    svg.append(path)
  }
  return svg
}

/** Swap a button's icon, keeping whatever label/title it already has. */
export function setIcon(button, name, label) {
  button.replaceChildren(icon(name))
  if (label) {
    button.title = label
    button.setAttribute('aria-label', label)
  }
}
