const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const protect = asyncHandler(async (req, res, next) => {
   
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
        
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
            next()
        } catch (err) {
            res.status(401).send("Invalid Token")
        
        }
    }
    if (!token) {
        res.status(401).json("token not found")
    }

})


module.exports = { protect }