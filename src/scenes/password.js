const { Scenes } = require("telegraf")
const { BaseScene } = Scenes
const index = require('../playwright/login')
myModule = require('./register')
mName = myModule.mName

const passwordScene = new BaseScene('password')
  .enter(ctx =>
    ctx.reply('Parolingizni kiriting'))
  .on('text', async ctx => {
    await index(mName, ctx.message.text)
    return ctx.scene.leave()
  })
  .leave(ctx => ctx.reply('Endi tizimga kirishingiz mumkin'))

module.exports = passwordScene