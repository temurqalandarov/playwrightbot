const { Scenes, Markup } = require("telegraf")
const { BaseScene } = Scenes

mTable = 0

const kirishScene = new BaseScene('kirish')
  .enter(ctx => ctx.reply('Nimani ko\'rmoqchisiz', Markup.keyboard([
    ['Results', 'Fixtures'],
    ['Standings']
  ]).oneTime().resize()))
  .on('text', ctx => {
    mTable = ctx.message.text
    ctx.scene.enter('slot')
    return ctx.scene.leave()
  })
  .leave()

exports.kirishScene = kirishScene
exports.mTable = mTable