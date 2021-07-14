const { Telegraf, Scenes: { Stage }, session } = require('telegraf')
const { scenes } = require('./scenes')
const stage = new Stage(scenes)
const bot = new Telegraf(process.env.BOT_TOKEN)
const User = require('../db/models/user')

bot
  .use(session())
  .use(stage.middleware())

bot.start(async ctx => {
  ctx.reply(`Salom <a href="tg://user?id=${ctx.message.from.id}">${ctx.message.from.first_name}</a>\n\nBotimizdan foydalanish uchun <b>FOM</b> akkauntingizni kiriting /login`, { parse_mode: 'HTML' })
})

bot.command('login', async ctx => {
  const id = await User.findOne({ chat_id: `${ctx.message.chat.id}` })
  if (!id)
    return await ctx.scene.enter('name')
  ctx.reply('Siz <b>FOM</b> akkauntingizni kiritgansiz\n\nBosh menyuga o\'tish uchun👉 /menu', { parse_mode: 'HTML' })
})

bot.command('menu', async ctx => {
  const id = await User.findOne({ chat_id: `${ctx.message.chat.id}` })
  if (id)
    return await ctx.scene.enter('category')
  ctx.reply('Siz <b>FOM</b> akkauntingizni kiritmagansiz\n\nAkkauntingizni kiritish uchun👉 /login', { parse_mode: 'HTML' })
})

module.exports = {
  bot
}



