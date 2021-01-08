import { RequestHandler, Router } from 'express'

export namespace NexusHandler {
  export const operationsHandler = (): RequestHandler => {
    return (request, response) => {
      response.status(200).json({
        name: 'gg'
      })
    }
  }

  const operationFilter: RequestHandler = (request, response) => {
    response.status(200).json({
      name: 'agge'
    })
  }

  export const handler = Router()
  handler.post('/', operationFilter)
}