const registerScene = require("./register")
const kirishScene = require('./kirish')

module.exports = {
  register: registerScene.registerScene,
  kirish: kirishScene.kirishScene,
  password: require('./password'),
  slot: require('./slot')
}
