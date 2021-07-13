const { Scenes: { BaseScene }, Markup } = require("telegraf")

module.exports = new BaseScene('category')
  .enter(ctx => ctx.reply('Kerakli bo\'limni tanlang', Markup.keyboard([
    ['Natijalar', 'Anons'],
    ['Turnir jadvali']
  ]).oneTime().resize()))
  .on('text', ctx => {
    ctx.session.category = ctx.message.text
    ctx.reply('Kerakli slot\'ni tanlang', Markup.keyboard([
      ['1', '2'],
      ['3', '4']
    ]).oneTime().resize())
    return ctx.scene.enter('slot')
  })