import { RequestHandler } from 'express'

import { TagCollectionModel } from './tag-collection.model'
import { ResponseBuilder } from '../../common/utils/response-builder.util'

export namespace TagCollectionGetController {
  export const getByQuery: RequestHandler = async (req, res, next) => {
    const queryTagRefId = req.query.tagrefid as string
    if (!queryTagRefId) return next()
    try {
      const document = await TagCollectionModel.Document.find({
        tag_ref_id: queryTagRefId,
      })
      res.status(200).json(document)
    } catch (error) {
      const response = ResponseBuilder.buildResponse500(error)
      res.status(response.statusCode).json(response.body)
    }
  }

  export const getAll: RequestHandler = async (req, res) => {
    try {
      const documents = await TagCollectionModel.Document.find()
      res.status(200).json(documents)
    } catch (error) {
      const response = ResponseBuilder.buildResponse500(error)
      res.status(response.statusCode).json(response.body)
    }
  }

  export const getOneByMongoId: RequestHandler = async (req, res) => {
    const paramMongoId = req.params.mongoId
    try {
      const document = await TagCollectionModel.Document.findById(paramMongoId)
      res.status(200).json(document)
    } catch (error) {
      const response = ResponseBuilder.buildResponse500(error)
      res.status(response.statusCode).json(response.body)
    }
  }
}
