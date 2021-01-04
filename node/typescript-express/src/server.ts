import express, { Express } from 'express'
import compression from 'compression'
import cors from 'cors'
import bodyParser from 'body-parser'

import { NexusCore } from './nexus/nexus.core'
import { IndexResponse } from './models/IndexResponse'

export class Server {
  private readonly LOG_PREFIX = '[server]'
  private readonly PORT = 4000
  private express: Express

  constructor() {
    this.express = express()
    this.express.use(compression())
    this.express.use(cors())
    this.express.use(bodyParser.json())
    this.express.use(NexusCore.PRESET_PATH, NexusCore.operationHandler())

    this.express.get('/', (request, response) => {
      const indexResponse = new IndexResponse()
      indexResponse.message = 'ok'
      response.status(200).json(indexResponse)
    })

    this.express.get('/favicon.ico', (request, response) => {
      response.status(204).end()
    })
  }

  start() {
    this.express.listen(this.PORT, () => {
      console.info(this.LOG_PREFIX, 'app listening')
      console.info(this.LOG_PREFIX, `port: ${this.PORT}`)
    })
  }
}
