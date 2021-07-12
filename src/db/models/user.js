const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  chat_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cookie: {
    type: [Object],
    required: true
  }
})

module.exports = mongoose.model('user', userSchema)