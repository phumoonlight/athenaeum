import express from 'express'
import compression from 'compression'
import cors from 'cors'
import bodyParser from 'body-parser'

import { Config } from './config'
import { Database } from './database'
import { RequestTracer } from './common/middlewares/request-tracer.middleware'
import { StatusCode } from './common/constants/status-code.const'
import { TagRouter } from './containers/tag/tag.router'
import { TagCollectionRouter } from './containers/tag-collection/tag-collection.router'

export namespace Server {
  Database.connect()
  const app = express()
  app.use(compression())
  app.use(cors())
  app.use(bodyParser.json())
  // add custom middlewares here.
  app.use(RequestTracer.traceRequest)
  // add router here.
  app.use('/tags', TagRouter.router)
  app.use('/tagcollections', TagCollectionRouter.router)

  app.get('/', (req, res) => {
    res.status(StatusCode.successOk).json({
      author_github: Config.url.authorGithub,
      github_repo_url: Config.url.repository,
      backoffice_url: Config.url.backoffice,
      available_routes: Config.availableRoutes,
    })
  })

  app.get('/favicon.ico', (req, res) => {
    res.status(StatusCode.successNoContent).end()
  })

  app.listen(Config.env.port, () => {
    console.info('[server] app listening')
    console.info(`[server] port: ${Config.env.port}`)
    console.info(`[server] env: ${Config.env.nodeEnv}`)
  })
}
