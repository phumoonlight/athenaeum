const dotenv = require('dotenv')
dotenv.config({ path: '.env' })

module.exports = {
  MONGO_CONNECTION: process.env.MONGO_CONNECTION,
}