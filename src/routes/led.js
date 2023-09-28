const express = require('express')
const route = express.Router()
const ledController = require('../app/controllers/ledController')

route.get('/', ledController.index)
route.put('/:program', ledController.updateData)

module.exports = route
