/* eslint-disable camelcase */
import { Document } from 'mongoose'

export interface TagCollectionDocument extends Document {
  tag_ref_id: string,
  data: object,
}
