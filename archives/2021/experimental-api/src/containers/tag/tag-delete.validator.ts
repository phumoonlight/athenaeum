import { header } from 'express-validator'

import { ChainValidator } from '../../common/validators/chain.validator'
import { ValidationMessage } from '../../common/constants/validation-message.const'

export namespace TagDeleteValidator {
  const HEADER_AUTH_NAME = 'expapi-auth'
  const HEADER_AUTH_VALUE = 'experimental-delete'
  export const checkHeader = [
    header(HEADER_AUTH_NAME)
      .equals(HEADER_AUTH_VALUE)
      .withMessage(ValidationMessage.unauthorized),
    ChainValidator.resultHandler,
  ]
}
