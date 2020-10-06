import express from 'express'
import { someModule } from './example-module'

const app = express()

app.get('/', (req, res) => {
  res.json({
    status: 'online',
  })
})

app.listen(3000, () => {
  console.log('ready at port 3000')
  someModule()
})

export const gat: Gatherer = {
  name: 'phumo'
}