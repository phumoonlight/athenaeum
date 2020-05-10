const atFirst = 0
const chain = (...handlers) => {
  const request = {}
  const next = () => {
    handlers.shift()
    handlers[atFirst](request, next)
  }
  handlers[atFirst](request, next)
}