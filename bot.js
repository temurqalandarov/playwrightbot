require('dotenv').config()
const https = require('https')
const express = require('express')
const app = express()
const { Telegraf, Scenes, session } = require('telegraf')
const { Stage } = Scenes
const scenes = require('./src/scenes')
const stage = new Stage(Object.values(scenes))
const bot = new Telegraf(process.env.BOT_TOKEN)

bot.telegram.setWebhook(`${process.env.URL}/bot${process.env.BOT_TOKEN}`)
app.use(bot.webhookCallback(`/bot${process.env.BOT_TOKEN}`))
bot.use(session()).use(stage.middleware())

bot.start((ctx) => ctx.reply('Welcome'))

bot.command('register', ctx => { return ctx.scene.enter('register') })
bot.command('kirish', ctx => { return ctx.scene.enter('kirish') })

setInterval(() => {
  https.get(`${process.env.URL}`)
}, 300000)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
})

// bot.launch().then(() => console.log('Bot ishladi...'))

