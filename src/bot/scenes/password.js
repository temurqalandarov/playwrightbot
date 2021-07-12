const { Scenes: { BaseScene } } = require("telegraf")
const login = require('../../playwright/login')
const User = require('../../db/models/user')

module.exports = new BaseScene('password')
  .on('text', async ctx => {
    const cookie = await login(ctx.session.name, ctx.message.text)
    await User.create({
      chat_id: ctx.message.chat.id,
      name: ctx.session.name,
      password: ctx.message.text,
      cookie: cookie
    })
    await ctx.reply('Endi tizimga kirishingiz mumkin')
    return ctx.scene.leave()
  })