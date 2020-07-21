const moveHistory = []

const coordinate = { x: 0, y: 0 }

const solution = (moveset) => {
  let position = 'up'
  moveset.forEach((movePoint, index) => {
  	switch (position) {
      case 'up' :
        for (let i = 1; i <= movePoint; i++) {
          coordinate.y = coordinate.y + 1
          moveHistory.push({step: index, ...coordinate})
        }
        position = 'right'
      break
      case 'right' :
        for (let i = 1; i <= movePoint; i++) {
          coordinate.x = coordinate.x + 1
          moveHistory.push({step: index,...coordinate})
        }
        position = 'down'
      break
      case 'down' :
        for (let i = 1; i <= movePoint; i++) {
          coordinate.y = coordinate.y - 1
          moveHistory.push({step: index,...coordinate})
        }
        position = 'left'
      break
      case 'left' :
        for (let i = 1; i <= movePoint; i++) {
          coordinate.x = coordinate.x - 1
          moveHistory.push({step: index,...coordinate})
        }
        position = 'up'
      break
    }
    console.log(moveHistory)
  })
}


const testcase = [1,3,2,5,4,4,6,3,2]

console.log(solution(testcase))