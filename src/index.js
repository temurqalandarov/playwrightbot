const https = require('https')
const express = require('express')
const app = express()
const { TOKEN, URL, PORT, ENV } = require('./config')
const { bot } = require('./bot')

module.exports = async () => {
  await require('./db/connect')()
  if (ENV === 'production') {

    bot.telegram.setWebhook(`${URL}/bot${TOKEN}`)
    app.use(bot.webhookCallback(`/bot${TOKEN}`))

    setInterval(() => {
      https.get(`${URL}`)
    }, 300000)

    return app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
  }

  await bot.launch().then(() => console.log('Bot ishladi...')).catch((e) => console.log(e))
}