const { connect } = require('mongoose')
const { USER, PASS } = require('../config')

module.exports = async () => {
  await connect(`mongodb+srv://${USER}:${PASS}@cluster0.njuat.mongodb.net/Fom?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDBga ulandik...'))
    .catch(e => console.log(e))
}
