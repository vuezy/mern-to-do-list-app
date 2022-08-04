const express = require('express')

const router = express.Router()
require('./authenticationRoute')(router)
require('./taskRoute')(router)

module.exports = router