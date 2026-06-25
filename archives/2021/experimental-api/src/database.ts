import mongoose from 'mongoose'

import { Config } from './config'

export namespace Database {
  const mongoEndpoint: string = Config.env.mongoConnection || ''
  export const connect = (): void => {
    try {
      mongoose.connect(mongoEndpoint, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      mongoose.connection.once('open', () => {
        console.info('[database] mongoose connection has been connected.')
      })
      mongoose.connection.on('error', (error) => {
        console.error('[database] connection error: ', error)
      })
    } catch (error) {
      console.error(error)
    }
  }
}
