import { RequestHandler } from 'express'
import { body } from 'express-validator'

import { TagModel } from './tag.model'
import { ResponseBuilder } from '../../common/utils/response-builder.util'
import { ChainValidator } from '../../common/validators/chain.validator'
import { ValidationMessage } from '../../common/constants/validation-message.const'

export namespace TagCreateValidator {
  const BODY_TAG_REF_ID = 'tag_ref_id'
  const BODY_TAG_NAME = 'tag_name'
  const BODY_TAG_DESCRIPTION = 'tag_description'

  export const checkDuplicatedRefId: RequestHandler = async (req, res, next) => {
    const bodyRefId = req.body.tag_ref_id
    try {
      const tagDocument = await TagModel.Document.findOne({ ref_id: bodyRefId })
      if (tagDocument) {
        const errorInfo = `duplicated tag reference id {${bodyRefId}}.`
        const response = ResponseBuilder.buildResponse422(errorInfo)
        res.status(response.statusCode).json(response.body)
        return
      }
      next()
    } catch (error) {
      const response = ResponseBuilder.buildResponse500(error)
      res.status(response.statusCode).json(response.body)
    }
  }

  export const checkBody = [
    body(BODY_TAG_REF_ID)
      .exists()
      .withMessage(ValidationMessage.required)
      .bail()
      .isString()
      .withMessage(ValidationMessage.string)
      .bail()
      .notEmpty()
      .withMessage(ValidationMessage.noEmpty)
      .bail()
      .not()
      .matches(/[^a-zA-Z0-9]/, 'gi')
      .withMessage(ValidationMessage.badTagRefId),
    body(BODY_TAG_NAME)
      .optional()
      .isString()
      .withMessage(ValidationMessage.string)
      .bail()
      .notEmpty()
      .withMessage(ValidationMessage.noEmpty)
      .escape(),
    body(BODY_TAG_DESCRIPTION)
      .optional()
      .isString()
      .withMessage(ValidationMessage.string)
      .escape(),
    ChainValidator.resultHandler,
  ]
}
