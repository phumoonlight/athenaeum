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
const textTemplate = `คุณอายุ ${age}`
const textString = 'คุณอายุ ${example}'

// switch
const test = 2
switch (test) {
  case 0 :
    //...
    break
  case 1 :
    // console.log('match 1')
    break
  default:
    // console.log('default')
}


const numbers = [1, 2, 3]
numbers.map((number) => {
  return number + 1
})


// callback

// A
const callback = () => {
  console.log('callback')
}

// B
const doSomething2 = (callbackFn) => {
  console.log('do B')
  callbackFn()
}

dosomething2(callback)

let clicknumber = 0
const afterclick = () => {
  clicknumber++
  document.getElementById('output').innerHTML = `<div style="color: green">${clicknumber}</div>`
  console.log('hello', clicknumber)
}

const firstName = 'wannapon'
const eatSnake = () => {}
const doSomething = () => {}
const convertStringToNumber = () => {}
const abc = () => {}
const hackNASA = () => {}
const getID = () => {}
const getId = () => {}

const firstName = getFirstName()
const MY_URL = 'https://www.w3schools.com/js/js_switch.asp'

