import { RequestHandler } from 'express'

import { TagModel } from './tag.model'
import { TagCollectionModel } from '../tag-collection/tag-collection.model'
import { ResponseBuilder } from '../../common/utils/response-builder.util'
import { StatusCode } from '../../common/constants/status-code.const'

export namespace TagDeleteController {
  export const deleteOneAndAllCollections: RequestHandler = async (req, res) => {
    const paramRefId = req.params.refId
    try {
      const deletedResult = await TagModel.Document.deleteOne({ ref_id: paramRefId })
      if (deletedResult.deletedCount) {
        await TagCollectionModel.Document.deleteMany({ tag_ref_id: paramRefId })
        res.status(StatusCode.successOk).json({
          status_code: StatusCode.successOk,
          info: 'tag and its collections deleted',
        })
        return
      }
      const response = ResponseBuilder.buildResponse404('tag not found')
      res.status(response.statusCode).json(response.body)
    } catch (error) {
      const response = ResponseBuilder.buildResponse500(error)
      res.status(response.statusCode).json(response.body)
    }
  }
}
