var express = require('express');
var router = express.Router();

const upload = require("../../utils/multer")

const { protect } = require("../../Middlewares/verifyToken")
const userSignupLogin = require("../../controller/User/signup-login")
const userProfile = require("../../controller/User/profileController")
const userAddBike = require("../../controller/User/userAddBikeController")
const userDisplayBikes = require("../../controller/User/bikes/displayBikesController")

// signUp Route

router.post('/user-signup',userSignupLogin.SignUpPost)

router.post('/user-login',userSignupLogin.LoginPost)

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

router.route("/bikes").get(userDisplayBikes.displayBikeController)

module.exports = router;
