import { body } from 'express-validator'

import { ChainValidator } from '../../common/validators/chain.validator'
import { ValidationMessage } from '../../common/constants/validation-message.const'

export namespace TagUpdateValidator {
  const BODY_TAG_NAME = 'tag_name'
  const BODY_TAG_DESC = 'tag_description'

  export const checkBody = [
    body(BODY_TAG_NAME)
      .optional()
      .isString()
      .withMessage(ValidationMessage.string)
      .escape(),
    body(BODY_TAG_DESC)
      .optional()
      .isString()
      .withMessage(ValidationMessage.string)
      .escape(),
    ChainValidator.resultHandler,
  ]
}
