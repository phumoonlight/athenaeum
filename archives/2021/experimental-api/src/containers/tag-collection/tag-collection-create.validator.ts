import { RequestHandler } from 'express'
import { body } from 'express-validator'

import { TagModel } from '../tag/tag.model'
import { ResponseBuilder } from '../../common/utils/response-builder.util'
import { CommonValidator } from '../../common/utils/common-validator.util'
import { ChainValidator } from '../../common/validators/chain.validator'
import { ValidationMessage } from '../../common/constants/validation-message.const'

export namespace TagCollectionCreateValidator {
  const ERROR404_INFO = 'tag not found'
  const BODY_TAG_REF_ID = 'tag_ref_id'
  const BODY_DATA = 'data'

  export const checkExistTag: RequestHandler = async (req, res, next) => {
    const bodyTagRefId = req.body.tag_ref_id
    try {
      const tagDocument = await TagModel.Document.findOne({
        ref_id: bodyTagRefId,
      })
      if (tagDocument) {
        return next()
      }
      const response = ResponseBuilder.buildResponse404(ERROR404_INFO)
      res.status(response.statusCode).json(response.body)
    } catch (error) {
      const response = ResponseBuilder.buildResponse500(error)
      res.status(response.statusCode).json(response.body)
    }
  }

  export const checkBody = [
    body(BODY_TAG_REF_ID)
      .exists()
      .withMessage(ValidationMessage.required),
    body(BODY_DATA)
      .exists()
      .withMessage(ValidationMessage.required)
      .bail()
      .custom((data) => CommonValidator.isPlainObject(data))
      .withMessage(ValidationMessage.object),
    ChainValidator.resultHandler,
  ]
}
