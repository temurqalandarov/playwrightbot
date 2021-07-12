const { Scenes: { BaseScene } } = require("telegraf")

module.exports = new BaseScene('name')
  .enter(ctx => ctx.reply('Nikingizni kiriting'))
  .on('text', ctx => {
    ctx.session.name = ctx.message.text
    ctx.reply('Parolingizni kiriting')
    return ctx.scene.enter('password')
  })