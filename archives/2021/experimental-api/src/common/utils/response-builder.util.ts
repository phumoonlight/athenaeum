import { StatusCode } from '../constants/status-code.const'

export namespace ResponseBuilder {
  const DEFAULT_ERROR404 = 'not found'
  const DEFAULT_ERROR422 = 'unprocessable entity'
  const DEFAULT_ERROR500 = 'internal server error'

  export const buildResponse404 = (errorInfo: any = DEFAULT_ERROR404) => ({
    statusCode: StatusCode.errorNotFound,
    body: {
      status_code: StatusCode.errorNotFound,
      info: errorInfo,
    },
  })

  export const buildResponse422 = (errorInfo: any = DEFAULT_ERROR422) => ({
    statusCode: StatusCode.errorUnprocessableEntity,
    body: {
      status_code: StatusCode.errorUnprocessableEntity,
      info: errorInfo,
    },
  })

  export const buildResponse500 = (errorInfo: any = DEFAULT_ERROR500) => ({
    statusCode: StatusCode.errorInternal,
    body: {
      status_code: StatusCode.errorInternal,
      info: errorInfo,
    },
  })
}
