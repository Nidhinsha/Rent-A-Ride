var express = require('express')
var router = express.Router()

const upload = require("../../utils/multer")

const loginController = require('../../controller/Admin/loginController')
const adminController = require("../../controller/Admin/adminController")
const addBikeController = require("../../controller/Admin/bikeController/adminAddBikeController")
const adminViewBikeController = require("../../controller/Admin/bikeController/adminViewBikeController")
const userBikeRentRequestController = require("../../controller/Admin/bikeController/userRentRequest")
const adminAcceptReq = require("../../controller/Admin/bikeController/accepetReqController")
const adminRejectReq = require("../../controller/Admin/bikeController/rejectReqController")
const locationController = require("../../controller/Admin/locationController")
const { protect } = require("../../Middlewares/verifyToken")


router.route("/login").post(loginController.adminLogin)

router.route("/user-manage").get(protect, adminController.adminUser)

router.route("/userBlockUnblock").get(protect,adminController.blockUser)

router.route("/add-bike").post(upload.array('images'),protect,addBikeController.addBike)

router.route("/view-bike").get(protect,adminViewBikeController.viewBike)

router.route("/user-rent-request").get(protect,userBikeRentRequestController.userRentRequest)

router.route("/accept-request").put(protect,adminAcceptReq.accepetReqController)

router.route("/reject-request").put(protect,adminRejectReq.rejectReqController)

router.route("/add-location").post(locationController.addLocation)

router.route("/locations").get(protect,locationController.getLocation)

router.route("/edit-location").put(protect,locationController.editLocation)

router.route("/delete-location").delete(protect,locationController.deleteLocation)

module.exports = router