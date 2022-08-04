const mongoose = require('mongoose')
const { db } = require('../config')

mongoose.connect(
  `mongodb://${db.host}:${db.port}/${db.name}`,
  {
    user: db.user,
    pass: db.pwd,
    authSource: db.auth
  }
)

const { Schema, model } = mongoose
const models = {}

models['User'] = require('./User')(Schema, model)
models['Task'] = require('./Task')(Schema, model)

module.exports = models