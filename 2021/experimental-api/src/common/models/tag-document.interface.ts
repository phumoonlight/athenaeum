/* eslint-disable camelcase */
import { Document } from 'mongoose'

export interface TagDocument extends Document {
  ref_id: string,
  name: string,
  description: string,
}
