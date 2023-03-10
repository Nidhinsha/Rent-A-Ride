const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')
dotenv.config()

// In here we are generating the jwt token for users

const generateToken = (id) =>{
    console.log(process.env.JWT_SECRET,'kkk');
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"5h"
    })
}

module.exports = generateToken