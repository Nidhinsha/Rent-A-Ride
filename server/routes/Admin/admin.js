var express = require('express')
var router = express.Router()

const upload = require("../../utils/multer")

const loginController = require('../../controller/Admin/loginController')
const adminController = require("../../controller/Admin/adminController")
const addBikeController = require("../../controller/Admin/bikeController/adminAddBikeController")
const adminViewBikeController = require("../../controller/Admin/bikeController/adminViewBikeController")
const { protect } = require("../../Middlewares/verifyToken")


router.route("/login").post(loginController.adminLogin)

router.route("/user-manage").get(protect, adminController.adminUser)

router.route("/userBlockUnblock").get(protect,adminController.blockUser)

router.route("/add-bike").post(upload.array('images'),protect,addBikeController.addBike)

router.route("/view-bike").get(adminViewBikeController.viewBike)

module.exports = router