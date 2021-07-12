const { Scenes: { BaseScene } } = require("telegraf")
const screen = require('../../playwright/screen')

module.exports = new BaseScene('slot')
  .on('text', async ctx => {
    await screen(ctx.message.chat.id, parseInt(ctx.message.text), ctx.session.category)
    await ctx.replyWithPhoto({ source: 'public/screenshots/clip.png' })
    return ctx.scene.leave()
  })