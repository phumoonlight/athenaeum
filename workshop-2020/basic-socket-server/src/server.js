import { Server } from 'http'
import express from 'express'
import configSocket from './configSocket'

const PORT = process.env.PORT || 8080

const app = express()
const server = Server(app)
configSocket(server)

server.listen(PORT, () => {
  console.info(`ready on port ${PORT}`)
})

app.get('/', (req, res) => {
  res.json({
    serverStatus: 'online',
  })
})
