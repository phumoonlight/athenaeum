const fs = require('fs')

console.log('initialize container')
let container = []

console.log('get image directory')
const dir = fs.readdirSync(`${__dirname}/img`)
console.log(dir)

const getAll = (callback) => {
  console.log('reading images file')
  dir.forEach((file) => {
    const img64 = fs.readFileSync(`${__dirname}/img/${file}`, 'base64')
    container = [...container, img64]
  })
  console.log('packing images')
  callback(container)
}

const build = (bundle) => {
  console.log('build file')
  const bundleStr = JSON.stringify(bundle, null, 2)
  fs.writeFileSync(`${__dirname}/images-pack.json`, bundleStr)
}

getAll(build)
