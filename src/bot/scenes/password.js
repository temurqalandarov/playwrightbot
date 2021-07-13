const { Scenes: { BaseScene } } = require("telegraf")
const login = require('../../playwright/login')
const User = require('../../db/models/user')

module.exports = new BaseScene('password')
  .on('text', async ctx => {
    const cookie = await login(ctx.session.name, ctx.message.text)
    if (!cookie)
      ctx.reply('Nik yoki parol xato\n\nQaytadan kiritish uchun👉 /login')
    else {
      await User.create({
        chat_id: ctx.message.chat.id,
        name: ctx.session.name,
        cookie: cookie
      })
      await ctx.reply('Tabriklaymiz, endi botimizdan to\'liq foydalanishingiz mumkin\n\n Bosh menyuga o\'tish uchun👉 /menu')
    }
    return ctx.scene.leave()
  })