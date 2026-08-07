// Inline SVG icons, kept in one place so the buttons stay text-free but still
// carry a title/aria-label for what they do.

const NS = 'http://www.w3.org/2000/svg'

const PATHS = {
  export: ['M12 4v10', 'm8 12 4 4 4-4', 'M4 20h16'],
  import: ['M12 16V6', 'm8 10 4-4 4 4', 'M4 20h16'],
  check: ['m5 13 4 4L19 7'],
  undo: ['M4 10h10a5 5 0 0 1 0 10H9', 'm4 10 4-4', 'm4 10 4 4'],
  plus: ['M12 5v14', 'M5 12h14'],
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
