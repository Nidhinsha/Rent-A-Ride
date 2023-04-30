const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')
dotenv.config()

// In here we are generating the jwt token for users

const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"30d"
    })
}

module.exports = generateToken