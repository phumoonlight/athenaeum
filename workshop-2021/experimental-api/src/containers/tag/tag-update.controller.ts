import { RequestHandler } from 'express'

import { TagModel } from './tag.model'
import { ResponseBuilder } from '../../common/utils/response-builder.util'
import { StatusCode } from '../../common/constants/status-code.const'
import { DefaultValue } from '../../common/constants/default-value.const'

export namespace TagUpdateController {
  export const updateOne: RequestHandler = async (req, res) => {
    const paramRefId = req.params.refId
    const bodyTagName = req.body.tag_name
    const bodyTagDescription = req.body.tag_description
    try {
      const tagDocument = await TagModel.Document.findOne({ ref_id: paramRefId })
      if (tagDocument) {
        const isBodyTagNameString = typeof bodyTagName === 'string'
        const isBodyTagDescriptionString = typeof bodyTagDescription === 'string'
        const newTagName = (bodyTagName || DefaultValue.tagName)
        const newTagDescription = (bodyTagDescription || DefaultValue.tagDescription)
        tagDocument.name = (
          isBodyTagNameString ? newTagName : tagDocument.name
        )
        tagDocument.description = (
          isBodyTagDescriptionString ? newTagDescription : tagDocument.description
        )
        const updatedTagDocument = await tagDocument.save()
        res.status(StatusCode.successOk).json(updatedTagDocument)
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
