import mongoose from 'mongoose'

import { TagCollectionDocument } from '../../common/models/tag-collection-document.interface'

export namespace TagCollectionModel {
  const COLLECTION_NAME = 'tags-collections'
  const schema = new mongoose.Schema(
    {
      tag_ref_id: {
        type: String,
        index: true,
        required: true,
      },
      data: {
        type: Object,
        required: true,
      },
    },
    {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    },
  )
  export const Document = mongoose.model<TagCollectionDocument>(COLLECTION_NAME, schema)
}
