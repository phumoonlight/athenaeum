const getRange = (start: number, end: number) => {
  const arr = new Array(end - start + 1).fill(undefined)
  const mappedAsRange = arr.map((_value, index) => start + index)
  return mappedAsRange
}

const main = () => {
  const range = getRange(0, 5)
  console.log(range.length)
  console.log(range)
}

main()
