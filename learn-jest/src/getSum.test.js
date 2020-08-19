const getSum = require('./getSum')

test('adds 1 + 2 to equal 3', () => {
  const result = getSum(1, 2)
  expect(result).toBe(3);
})