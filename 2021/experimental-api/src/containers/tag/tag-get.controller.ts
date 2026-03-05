import { RequestHandler } from 'express'

import { TagModel } from './tag.model'
import { ResponseBuilder } from '../../common/utils/response-builder.util'
import { StatusCode } from '../../common/constants/status-code.const'

export namespace TagGetController {
  const SELECTED_FIELD = '-__v'

  export const getAll: RequestHandler = async (req, res) => {
    try {
      const tagDocuments = await TagModel.Document.find().select(SELECTED_FIELD)
      res.status(StatusCode.successOk).json(tagDocuments)
    } catch (error) {
      const response = ResponseBuilder.buildResponse500(error)
      res.status(response.statusCode).json(response.body)
    }
  }

  export const getOne: RequestHandler = async (req, res) => {
    const paramRefId = req.params.refId
    try {
      const tagDocument = await TagModel.Document.findOne({ ref_id: paramRefId }).select(SELECTED_FIELD)
      res.status(StatusCode.successOk).json(tagDocument)
    } catch (error) {
      const response = ResponseBuilder.buildResponse500(error)
      res.status(response.statusCode).json(response.body)
    }
  }
}
