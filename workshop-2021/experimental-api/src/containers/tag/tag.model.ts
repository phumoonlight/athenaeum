import mongoose from 'mongoose'

import { TagDocument } from '../../common/models/tag-document.interface'

export namespace TagModel {
  const COLLECTION_NAME = 'tags'
  const schema = new mongoose.Schema(
    {
      ref_id: {
        type: String,
        unique: true,
      },
      name: {
        type: String,
        default: 'unnamed tag',
      },
      description: {
        type: String,
        default: 'no description.',
      },
    },
    {
      timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    },
  )
  export const Document = mongoose.model<TagDocument>(COLLECTION_NAME, schema)
}
