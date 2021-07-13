const { Scenes: { BaseScene }, Markup } = require("telegraf")
const screen = require('../../playwright/screen')

module.exports = new BaseScene('slot')
  .on('text', async ctx => {
    await ctx.reply('Bir necha soniya kuting...', Markup.removeKeyboard())
    const image = await screen(ctx.message.chat.id, parseInt(ctx.message.text), ctx.session.category)
    await ctx.deleteMessage(ctx.message.message_id + 1)
    if (image)
      await ctx.reply('Qandaydir xatolik ro\'y berdi\n\nQayta urunib ko\'rish uchun👉 /menu')
    else {
      await ctx.replyWithPhoto({ source: 'public/screenshots/clip.png' })
      await ctx.reply('Asosiy menyuga o\'tish uchun👉 /menu')
    }
    return ctx.scene.leave()
  })