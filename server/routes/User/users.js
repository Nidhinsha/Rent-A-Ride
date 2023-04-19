var express = require('express');
var router = express.Router();

const upload = require("../../utils/multer")

const { protect } = require("../../Middlewares/verifyToken")
const userSignupLogin = require("../../controller/User/signup-login")
const userProfile = require("../../controller/User/profileController")
const userAddBike = require("../../controller/User/userAddBikeController")
const userDisplayBikes = require("../../controller/User/bikes/displayBikesController")
const searchBikesController = require("../../controller/User/bikes/searchBikeController")
const rentedBikeController = require("../../controller/User/bikes/rentedBikesController")
const locationController = require("../../controller/User/locationController")
const bookingController = require("../../controller/User/bookingController")
const chatContoller = require("../../controller/User/chatController/chatController")
const walletController = require("../../controller/User/walletController")
const userCouponController = require("../../controller/User/userCouponController")
// signUp Route

router.post('/user-signup',userSignupLogin.SignUpPost)

router.post('/user-login',userSignupLogin.LoginPost)

// google signIn
router.post("/google-signup",userSignupLogin.googleSingup)

router.route('/otp-login').post(userSignupLogin.otpLoginController)
// Home
router.route("/").get(protect,)

// Profile
router.route("/profile").get(protect,userProfile.profileGet)

// edit profile 
router.route("/edit-profile").post(protect,userProfile.editProfile)

// Add Profile Photo
router.route("/userProfileImageUpdate").post(protect, userProfile.addPhoto);

// add proof
router.route("/userAddProof").post(protect,userProfile.addProof)

// Add bike from the user
router.route("/rent-bike").post(upload.array('images'),protect,userAddBike.userAddBike);
// displaying the all bikes
router.route("/bikes").get(userDisplayBikes.displayBikeController)
// search bikes
router.route("/search-bikes").post(searchBikesController.searchBikes)

// displaying user rented bikes like rejected and accepted and in that page the edit of that item
router.route('/all-bikes').get(protect,rentedBikeController.userAllBikeController)

router.route("/sort-bike-asc").get()

router.route("/accepted-bikes").get(protect,rentedBikeController.userGetAcceptedBikes)
router.route("/rejected-bikes").get(protect,rentedBikeController.userGetRejectedBikes)
router.route("/pending-bikes").get(protect,rentedBikeController.userGetPendingBikes)

router.route('/get-location').get(locationController.getLocations)

router.route("/booking-bike").post(bookingController.bikeBookingController)

router.route("/booked-bikes").get(protect,bookingController.userGetBookedBikeController)

router.route("/booking-success").post(protect,bookingController.userCreateOrderController)
// coupons

router.route("/user-coupons").get(protect,userCouponController.userGetCoupons)

// wallet

router.route("/wallet").get(protect,walletController.getWalletController)

// chat

router.route("/contacts").get(protect,chatContoller.userContactController)

router.route("/add-message").post(protect,chatContoller.addMessageController)

router.route("/get-all-messages").post(protect,chatContoller.getAllMessageController)

module.exports = router;
