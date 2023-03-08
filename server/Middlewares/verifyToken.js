const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const protect = (req, res, next) => {

   let token ;
   
   if (req.headers.authorization && req.authorization.startWith("Bearer")) {
    try {
        token = req.headers.authorization.split(" ")[1]
        console.log(token,'this is the token ..');

        const decode = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        
    }
   }
}

module.exports = { protect }