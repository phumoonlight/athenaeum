import { RequestHandler } from 'express'

import { TagCollectionModel } from './tag-collection.model'
import { ResponseBuilder } from '../../common/utils/response-builder.util'

export namespace TagCollectionDeleteController {
  const SUCCESS_INFO = 'tag collection deleted'
  const ERROR_PREFIX = '[tag-collection][delete][error]'

  export const deleteOne: RequestHandler = async (req, res) => {
    const paramMongoId = req.params.mongoId
    try {
      await TagCollectionModel.Document.deleteOne({ _id: paramMongoId })
      res.status(200).json({
        status_code: 200,
        info: SUCCESS_INFO,
      })
    } catch (error) {
      console.error(ERROR_PREFIX, error)
      const response = ResponseBuilder.buildResponse500(error)
      res.status(response.statusCode).json(response.body)
    }
  }
}
