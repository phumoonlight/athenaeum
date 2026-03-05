import express from 'express'

import { TagCreateController } from './tag-create.controller'
import { TagCreateValidator } from './tag-create.validator'
import { TagGetController } from './tag-get.controller'
import { TagUpdateController } from './tag-update.controller'
import { TagUpdateValidator } from './tag-update.validator'
import { TagDeleteController } from './tag-delete.controller'
import { TagDeleteValidator } from './tag-delete.validator'

export namespace TagRouter {
  export const router = express.Router()

  router.get(
    '/',
    TagGetController.getAll,
  )

  router.get(
    '/:refId',
    TagGetController.getOne,
  )

  router.post(
    '/',
    TagCreateValidator.checkBody,
    TagCreateValidator.checkDuplicatedRefId,
    TagCreateController.createOne,
  )

  router.patch(
    '/:refId',
    TagUpdateValidator.checkBody,
    TagUpdateController.updateOne,
  )

  router.delete(
    '/:refId',
    TagDeleteValidator.checkHeader,
    TagDeleteController.deleteOneAndAllCollections,
  )
}
