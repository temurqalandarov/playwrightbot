const { Scenes: { BaseScene } } = require("telegraf")

module.exports = new BaseScene('name')
  .enter(ctx => ctx.reply('Nik\'ingizni kiriting'))
  .on('text', ctx => {
    ctx.session.name = ctx.message.text
    ctx.reply('Parol\'ingizni kiriting')
    return ctx.scene.enter('password')
  })