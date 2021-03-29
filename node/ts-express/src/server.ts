import express, { Express, Request, Response } from 'express'
import { json } from 'body-parser'
import compression from 'compression'
import cors from 'cors'

const LOG_PREFIX: string = '[server]'
const server: Express = express()

server.use(compression())
server.use(cors())
server.use(json())

server.get('/favicon.ico', (req: Request, res: Response) => {
  res.status(204)
  res.end()
})

export const listen = (port: number): void => {
  server.listen(port, () => {
    console.info(LOG_PREFIX, `listening at port: ${port}`)
  })
}
