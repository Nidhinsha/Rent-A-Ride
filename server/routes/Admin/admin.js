var express = require('express')
var router = express.Router()

const upload = require("../../utils/multer")

const loginController = require('../../controller/Admin/loginController')
const adminController = require("../../controller/Admin/adminController")
const addBikeController = require("../../controller/Admin/bikeController/adminAddBikeController")
const deleteBikeController = require("../../controller/Admin/bikeController/deleteBikeController")
const adminViewBikeController = require("../../controller/Admin/bikeController/adminViewBikeController")
const userBikeRentRequestController = require("../../controller/Admin/bikeController/userRentRequest")
const adminAcceptReq = require("../../controller/Admin/bikeController/accepetReqController")
const adminRejectReq = require("../../controller/Admin/bikeController/rejectReqController")
const locationController = require("../../controller/Admin/locationController")
const editBikeController = require("../../controller/Admin/bikeController/editBikeController")
const couponController = require("../../controller/Admin/couponController")
const bookingController = require("../../controller/Admin/bookingController")
const dashboardController = require("../../controller/Admin/DashboardController/dashboardController")
const bikeReportController = require("../../controller/Admin/bikeReportController/bikeReportController")
const { protect } = require("../../Middlewares/verifyToken")


router.route("/login").post(loginController.adminLogin)

router.route("/user-manage").get(protect, adminController.adminUser)
router.route("/userBlockUnblock").get(protect,adminController.blockUser)

router.route("/add-bike").post(upload.array('images'),protect,addBikeController.addBike)
router.route('/edit-bike').post(upload.array('images'),protect,editBikeController.editBike)
router.route('/delete-bike').delete(protect,deleteBikeController.deleteBike)
router.route("/view-bike").get(protect,adminViewBikeController.viewBike)

router.route("/user-rent-request").get(protect,userBikeRentRequestController.userRentRequest)
router.route("/accept-request").put(protect,adminAcceptReq.accepetReqController)
router.route("/reject-request").put(protect,adminRejectReq.rejectReqController)

router.route("/add-location").post(protect,locationController.addLocation)
router.route("/locations").get(protect,locationController.getLocation)
router.route("/edit-location").put(protect,locationController.editLocation)
router.route("/delete-location").delete(protect,locationController.deleteLocation)

router.route("/coupons").get(protect,couponController.getCoupons)
router.route("/add-coupon").post(protect,couponController.addCoupon)
router.route("/edit-coupon").put(protect,couponController.editCoupon)
router.route("/delete-coupon").delete(protect,couponController.deleteCoupon)

router.route("/view-booked-bike").get(protect,bookingController.adminGetBookedBikeController)

router.route("/get-dashboard-info").get(protect,dashboardController.getDashboardData)

router.route("/bikes-report").get(protect,bikeReportController.bikesReportData)
module.exports = router