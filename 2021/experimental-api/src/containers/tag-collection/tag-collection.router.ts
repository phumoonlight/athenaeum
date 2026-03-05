import express from 'express'

import { TagCollectionCreateController } from './tag-collection-create.controller'
import { TagCollectionCreateValidator } from './tag-collection-create.validator'
import { TagCollectionGetController } from './tag-collection-get.controller'
import { TagCollectionDeleteController } from './tag-collection-delete.controller'

export namespace TagCollectionRouter {
  export const router = express.Router()

  router.get(
    '/',
    TagCollectionGetController.getByQuery,
    TagCollectionGetController.getAll,
  )

  router.get(
    '/:mongoId',
    TagCollectionGetController.getOneByMongoId,
  )

  router.post(
    '/',
    TagCollectionCreateValidator.checkBody,
    TagCollectionCreateValidator.checkExistTag,
    TagCollectionCreateController.createOne,
  )

  // tagRouter.patch(
  //   '/:refId',
  //   updateTagBodyValidator,
  //   updateTagHandler,
  // )

  router.delete(
    '/:mongoId',
    TagCollectionDeleteController.deleteOne,
  )
}
