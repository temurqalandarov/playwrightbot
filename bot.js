const http = require('http')
const express = require('express')
const app = express()
const { Telegraf } = require('telegraf')
require('dotenv').config()
const img = require('./src/app')

const bot = new Telegraf(process.env.BOT_TOKEN)
console.log('Bot ishladi...')

bot.telegram.setWebhook(`${process.env.URL}/bot${process.env.BOT_TOKEN}`)
app.use(bot.webhookCallback(`/bot${process.env.BOT_TOKEN}`))

bot.start((ctx) => ctx.reply('Welcome'))

bot.command('results', async ctx => {
  await img()
  await ctx.replyWithPhoto({ source: 'public/clip.png' })
})

setInterval(() => {
  http.get(`${process.env.URL}`)
}, 300000)

app.get('/', (req, res) => {
  res.send('Hello World')
})

// bot.launch()

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
})
