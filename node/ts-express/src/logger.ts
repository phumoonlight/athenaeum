import { Request, Response, NextFunction } from 'express'

const logRequest = (req: Request, res: Response, next: NextFunction): void => {
  console.info(`[request] ${req.method} ${req.url}`)
  next()
}

export const getRequestLogger = (): typeof logRequest => {
  return logRequest
}
