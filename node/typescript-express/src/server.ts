import express from 'express'
import compression from 'compression'
import cors from 'cors'
import bodyParser from 'body-parser'

import { NexusCore } from './nexus/nexus.core'

export namespace Server {
  const PORT = 4000
  const LOG_PREFIX = '[server]'
  const server = express()
  server.use(compression())
  server.use(cors())
  server.use(bodyParser.json())
  server.use(NexusCore.PRESET_PATH, NexusCore.operationHandler())

  server.get('/', (request, response) => {
    response.status(200).json({
      status_message: 'ok',
    })
  })

  server.get('/favicon.ico', (request, response) => {
    response.status(204).end()
  })

  // server.use('/tagcollections', TagCollectionRouter.router)
  // app.get('/', (req, res) => {
  //   res.status(StatusCode.successOk).json({
  //     author_github: Config.url.authorGithub,
  //     github_repo_url: Config.url.repository,
  //     backoffice_url: Config.url.backoffice,
  //     available_routes: Config.availableRoutes,
  //   })
  // })

  export const start = () => {
    server.listen(PORT, () => {
      console.info(LOG_PREFIX, 'app listening')
      console.info(LOG_PREFIX, `port: ${PORT}`)
    })
  }
}
