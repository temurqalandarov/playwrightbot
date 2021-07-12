require('dotenv').config()

const TOKEN = process.env.BOT_TOKEN
const ENV = process.env.ENVIRONMENT
const URL = process.env.URL
const PORT = process.env.PORT
const USER = process.env.DB_USERNAME
const PASS = process.env.DB_PASSWORD

module.exports = {
  TOKEN,
  ENV,
  URL,
  PORT,
  USER,
  PASS
}