var express = require('express')
var router = express.Router()


const loginController = require('../../controller/Admin/loginController')
const adminController = require("../../controller/Admin/adminController")
const { protect } = require("../../Middlewares/verifyToken")


router.route("/login").post(loginController.adminLogin)

router.route("/user-manage").get(protect, adminController.adminUser)

router.route("/blockUser").get(protect,adminController.blockUser)

module.exports = router