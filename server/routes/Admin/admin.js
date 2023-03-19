var express = require('express')
var router = express.Router()

const upload = require("../../utils/multer")

const loginController = require('../../controller/Admin/loginController')
const adminController = require("../../controller/Admin/adminController")
const addBikeController = require("../../controller/Admin/bikeController/adminAddBikeController")
const { protect } = require("../../Middlewares/verifyToken")


router.route("/login").post(loginController.adminLogin)

router.route("/user-manage").get(protect, adminController.adminUser)

router.route("/blockUser").get(protect,adminController.blockUser)

router.route("/add-bike").post(upload.array('image'),addBikeController.addBike)

module.exports = router