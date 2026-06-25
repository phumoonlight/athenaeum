import 'dotenv/config'

const { env } = process

export const SERVER_CONFIG = {
  port: +(env.PORT || '4000'),
}

export const JWT_CONFIG = {
  key: env.JWT_KEY || 'dev',
  exp: env.JWT_EXP || '1h',
}

export const DB_CONFIG = {
  type: 'postgres',
  host: env.DB_HOST || 'localhost',
  port: +(env.DB_PORT || '5432'),
  username: env.DB_USERNAME || 'postgres',
  password: env.DB_PASSWORD || 'password',
  database: env.DB_NAME || 'postgres',
  logging: env.DB_LOGGING === 'true',
}