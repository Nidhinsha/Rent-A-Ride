var express = require('express')
var router = express.Router()
const adminLogin = require('../../controller/Admin/loginController')


router.post('/login',adminLogin.adminLogin)

module.exports = router