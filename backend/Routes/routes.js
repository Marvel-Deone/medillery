const express = require('express')
const router = express.Router()
const goodsController  = require('../Controllers/goodsController')

router.get('/allgoods',goodsController.allProducts)

module.exports = router