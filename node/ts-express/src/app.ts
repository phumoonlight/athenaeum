import express, { Express, Request, Response } from 'express'
import compression from 'compression'
import cors from 'cors'
import swagger from 'swagger-ui-express'

import { getRequestLogger, RequestLogger } from './logger'
import { swaggerConfig } from './swagger/swagger.config'
import { userController } from './core/user/user.controller'

const requestLogger: RequestLogger = getRequestLogger()
const app: Express = express()

app.use(compression())
app.use(cors())
app.use(express.json())
app.use('/swagger', swagger.serve, swagger.setup(swaggerConfig))
app.use(requestLogger)
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
