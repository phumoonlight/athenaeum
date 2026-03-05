import { RequestHandler } from 'express'

import { TagCollectionModel } from './tag-collection.model'
import { ResponseBuilder } from '../../common/utils/response-builder.util'
import { StatusCode } from '../../common/constants/status-code.const'

export namespace TagCollectionCreateController {
  export const createOne: RequestHandler = async (req, res) => {
    const bodyTagRefId = req.body.tag_ref_id
    const bodyTagCollectionData = req.body.data
    try {
      const tagCollectionModel = new TagCollectionModel.Document({
        tag_ref_id: bodyTagRefId,
        data: bodyTagCollectionData,
      })
      const createdDocument = await tagCollectionModel.save()
      res.status(StatusCode.successCreated).json(createdDocument)
    } catch (error) {
      const response = ResponseBuilder.buildResponse500(error)
      res.status(response.statusCode).json(response.body)
    }
  }
}
