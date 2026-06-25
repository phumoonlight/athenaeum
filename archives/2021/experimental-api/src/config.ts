import dotenv from 'dotenv'

export namespace Config {
  dotenv.config()
  const DEV_ENV = 'development'
  const DEV_HOST = 'http://localhost:8080'
  const PRODUCTION_HOST = 'https://experimentalapi.herokuapp.com'

  export const isDevelopment = (
    process.env.NODE_ENV === DEV_ENV
  )

  export const activeHost = (
    isDevelopment ? DEV_HOST : PRODUCTION_HOST
  )

  export const env = {
    port: process.env.PORT || 8080,
    nodeEnv: process.env.NODE_ENV,
    mongoConnection: process.env.MONGO_CONNECTION,
  }

  export const url = {
    authorGithub: 'https://github.com/phumoonlight',
    repository: 'https://github.com/phumoonlight/experimental-api',
    backoffice: 'https://experimentalbackoffice.vercel.app/',
  }

  export const availableRoutes = [
    `${activeHost}/tags`,
    `${activeHost}/tags/{tag}`,
    `${activeHost}/tagcollections`,
    `${activeHost}/tagcollections/{id}`,
  ]
}
