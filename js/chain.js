const chain = (...handlers) => {
  let targetIndex = 0
  const state = {}
  const next = () => {
    targetIndex += 1
    handlers[targetIndex](state, next)
  }
  if (Array.isArray(handlers[targetIndex])) {
    chain(...handlers[targetIndex])
  } else {
    handlers[targetIndex](state, next)
  }
}

chain([(state, next) => {
  console.log(1)
  state.abc = 'abc'
  next()
}, (state, next) => {
  console.log(state)
  state.cbd = 'asf'
  next()
}, (state, next) => {
  console.log(state)
  next()
}], () => console.log('final'))