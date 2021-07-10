const { Scenes, Markup } = require("telegraf")
const { BaseScene } = Scenes
const idx = require('../playwright/screen')
myModule = require('./register')
mName = myModule.mName
myVar = require('./kirish')
mTable = myVar.mTable

const slotScene = new BaseScene('slot')
  .enter(ctx => ctx.reply('Slotni tanlang', Markup.keyboard([
    ['1', '2'],
    ['3', '4']
  ]).oneTime().resize()))
  .on('text', async ctx => {
    await idx(mName, parseInt(ctx.message.text), mTable)
    await ctx.replyWithPhoto({ source: 'public/screenshots/clip.png' })
    return ctx.scene.leave()
  })
  .leave()

module.exports = slotScene