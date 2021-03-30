import { Request, Response, NextFunction } from 'express'

export interface RequestLogger {
  (req: Request, res: Response, next: NextFunction): void
}

export const getRequestLogger = (): RequestLogger => {
  return (req: Request, res: Response, next: NextFunction): void => {
    console.info(`[request] ${req.method} ${req.url}`)
    next()
  }
}
