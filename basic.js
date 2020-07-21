// declare variables
var x = 1
let y = 2
const z = 3

// declare functions

function doSomething(a, b) {
  return a + b
}

const doSomethingArrow = (a, b) => a + b

// using functions

const result1 = doSomething(1, 2)
const result2 = doSomethingArrow(1, 2)

// conditional

const condition = true
if (condition) {
  // ...do something when true
} else {
  // ...do something when false
}

const resultShortIf = condition ? doSomething(1, 2) : null

// object

const person = {
  name: 'com',
  age: 99,
  address: {
    village: 123
  },
  kick() {},
  run: () => {}
}

// template string

const age = 44

const textTemplate = `คุณอายุ ${example}`

const textString = 'คุณอายุ ${example}'
