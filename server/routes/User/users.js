var express = require('express');
var router = express.Router();

const userSignupLogin = require("../../controller/User/signup-login")

// signUp Route

router.post('/user-signup',userSignupLogin.SignUpPost)

router.post('/user-login',userSignupLogin.LoginPost)

module.exports = router;
