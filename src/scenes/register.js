const { Scenes } = require("telegraf")
const { BaseScene } = Scenes

mName = 0

const registerScene = new BaseScene('register')
  .enter(ctx => ctx.reply('Nikingizni kiriting'))
  .on('text', ctx => {
    mName = ctx.message.text
    console.log(mName)
    ctx.scene.enter('password')
    return ctx.scene.leave()
  })
  .leave()
// .use((ctx) => ctx.scene.reenter())


exports.registerScene = registerScene
exports.mName = mName