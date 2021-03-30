import express, { Express, Request, Response } from 'express'
import { json } from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import swagger from 'swagger-ui-express'

import { swaggerConfig } from './swagger/swagger.config'
import { userController } from './core/user/user.controller'

const app: Express = express()

app.use(compression())
app.use(cors())
app.use(json())
app.use('/swagger', swagger.serve, swagger.setup(swaggerConfig))
app.use('/users', userController)

app.get('/favicon.ico', (req: Request, res: Response) => {
  res.status(204)
  res.end()
})

export const listen = (port: number): void => {
  app.listen(port, () => {
    console.info(`[server] listening at port: ${port}`)
  })
}
