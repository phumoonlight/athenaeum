import { DB_CONFIG } from 'src/config'
import { DataSource } from 'typeorm'

export const database = new DataSource({
  type: 'postgres',
  host: DB_CONFIG.host,
  port: DB_CONFIG.port,
  username: DB_CONFIG.username,
  password: DB_CONFIG.password,
  database: DB_CONFIG.database,
  logging: DB_CONFIG.logging,
  entities: ['./dist/**/*.entity.js'],
})

export const testDatabaseConn = async () => {
  try {
    await database.initialize()
    console.log('testDatabaseConn: connected')
    return true
  } catch (err) {
    console.error('testDatabaseConn:', err)
    return false
  }
}
