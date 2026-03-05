import { RequestHandler } from 'express'

export namespace RequestTracer {
  const PREFIX = '[request-tracer]'
  export const traceRequest: RequestHandler = (req, res, next) => {
    console.info(`${PREFIX} ${req.method} ${req.url}`)
    next()
  }
}
