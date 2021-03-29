import express, { Express, Request, Response } from 'express'
import { json } from 'body-parser'
import compression from 'compression'
import cors from 'cors'

const app: Express = express()

app.use(compression())
app.use(cors())
app.use(json())

app.get('/favicon.ico', (req: Request, res: Response) => {
  res.status(204)
  res.end()
})

export const listen = (port: number): void => {
  app.listen(port, () => {
    console.info(`[server] listening at port: ${port}`)
  })
}
