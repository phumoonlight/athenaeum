import { createConnection } from 'typeorm'

export const connectDatabase = async () => {
  try {
    await createConnection()
    console.log('[database] connected.')
  } catch (error) {
    console.error('[database]', error)
  }
}