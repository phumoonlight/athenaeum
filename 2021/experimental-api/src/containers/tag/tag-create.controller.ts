import { RequestHandler } from 'express'

import { TagModel } from './tag.model'
import { ResponseBuilder } from '../../common/utils/response-builder.util'
import { StatusCode } from '../../common/constants/status-code.const'

export namespace TagCreateController {
  export const createOne: RequestHandler = async (req, res) => {
    const bodyRefId = req.body.tag_ref_id
    const bodyTagName = req.body.tag_name
    const bodyTagDescription = req.body.tag_description
    try {
      const newDocument = new TagModel.Document({
        ref_id: bodyRefId,
        name: bodyTagName,
        description: bodyTagDescription,
      })
      const createdDocument = await newDocument.save()
      res.status(StatusCode.successCreated).json(createdDocument)
    } catch (error) {
      const response = ResponseBuilder.buildResponse500(error)
      res.status(response.statusCode).json(response.body)
    }
  }
}
