const { Scenes: { BaseScene }, Markup } = require("telegraf")

module.exports = new BaseScene('category')
  .enter(ctx => ctx.reply('Nimani ko\'rmoqchisiz', Markup.keyboard([
    ['Results', 'Fixtures'],
    ['Standings']
  ]).oneTime().resize()))
  .on('text', ctx => {
    ctx.session.category = ctx.message.text
    ctx.reply('Slotni tanlang', Markup.keyboard([
      ['1', '2'],
      ['3', '4']
    ]).oneTime().resize())
    return ctx.scene.enter('slot')
  })