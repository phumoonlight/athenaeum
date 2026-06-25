import { DB_CONFIG } from 'src/config'
import { DataSource } from 'typeorm'

const migrationDatabase = new DataSource({
  type: 'postgres',
  host: DB_CONFIG.host,
  port: DB_CONFIG.port,
  username: DB_CONFIG.username,
  password: DB_CONFIG.password,
  database: DB_CONFIG.database,
  logging: DB_CONFIG.logging,
  entities: ['./src/**/*.entity.ts'],
  migrationsTableName: '_migrations',
  migrations: ['./src/database/migrations/*.ts'],
})

export default migrationDatabase