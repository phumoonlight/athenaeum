import { RequestHandler, Router, Request, Response } from 'express'
import { EventEmitter } from 'events'

interface OperationHandlerOptions {}

interface OperationHandler {
  (options?: OperationHandlerOptions): Router
}

export namespace NexusCore {
  const DEFAULT_OPTIONS = {}
  export const PRESET_PATH = '/nexus'

  const eventEmitter = new EventEmitter()
  eventEmitter.on('ee', (request: Request, response: Response) => {
    response.status(200).json({
      name: 'agge'
    })
  })

  eventEmitter.on('abc', (request: Request, response: Response) => {
    response.status(200).json({
      name: 'abcdefg'
    })
  })

  const operationFilter: RequestHandler = (request, response) => {
    const operationCode = request.body.operation_code
    const isOperated = eventEmitter.emit(operationCode, request, response)
    if (isOperated) return
    response.status(404).json({
      status_code: 404,
      info: 'invalid operation code'
    })
  }

  const nexusUI: RequestHandler = (request, response) => {
    response.status(200).send('<h1>NEXUS API ALPHA</h1>')
  }

  export const operationHandler: OperationHandler = (options = DEFAULT_OPTIONS) => {
    const router = Router()
    router.get('/', nexusUI)
    router.post('/', operationFilter)
    return router
  }
}