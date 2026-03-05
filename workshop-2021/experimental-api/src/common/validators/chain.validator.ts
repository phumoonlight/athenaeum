import { RequestHandler } from 'express'
import { validationResult, ErrorFormatter, Result } from 'express-validator'

import { ResponseBuilder } from '../utils/response-builder.util'

export namespace ChainValidator {
  const formatter: ErrorFormatter = (error) => (
    `${error.location}[${error.param}]: ${error.msg}`
  )

  export const resultHandler: RequestHandler = (req, res, next) => {
    const validateResult: Result = validationResult(req).formatWith(formatter)
    if (validateResult.isEmpty()) {
      return next()
    }
    const response = ResponseBuilder.buildResponse422(validateResult.array())
    res.status(response.statusCode).json(response.body)
  }
}
