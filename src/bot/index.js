const { Telegraf, Scenes: { Stage }, session } = require('telegraf')
const { scenes } = require('./scenes')
const stage = new Stage(scenes)
const bot = new Telegraf(process.env.BOT_TOKEN)
const User = require('../db/models/user')

bot
  .use(session())
  .use(stage.middleware())

bot.start(async ctx => {
  const id = await User.findOne({ chat_id: `${ctx.message.chat.id}` })
  if (!id)
    return await ctx.scene.enter('name')
  await ctx.scene.enter('category')
})

// bot.catch((err) => {
//   const message = err.stack || err
//   console.log(message, err)
//   bot.telegram.sendMessage(DEV_ID, message)
// })

// bot.command('register', ctx => { return ctx.scene.enter('register') })
// bot.command('kirish', ctx => { return ctx.scene.enter('kirish') })

module.exports = {
  bot
}



