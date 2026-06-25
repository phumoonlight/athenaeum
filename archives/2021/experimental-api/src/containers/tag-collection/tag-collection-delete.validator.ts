import { header, param } from 'express-validator'

import { ChainValidator } from '../../common/validators/chain.validator'

export namespace TagCollectionDeleteValidator {
  export const checkHeader = [
    header('expapi-auth').equals('experimental-delete').withMessage('unauthorized'),
    ChainValidator.resultHandler,
  ]

  export const checkParam = [
    param('refId').isMongoId().withMessage('must be mongoid'),
    ChainValidator.resultHandler,
  ]
}
