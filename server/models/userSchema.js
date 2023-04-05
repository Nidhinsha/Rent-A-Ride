const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        // required: true
    },
    lastName: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true,
        unique: true
    },
    phone: {
        type: Number,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    status: {
        type: Boolean,
        default: true
    },
  
    photo: {
        type: String,
       
    },
    proof:{
        type:String
    },
    isGoogle:{
        type : Boolean,
        default : false
    }
}
    , {
        timestamps: true
    }
)


const model = mongoose.model("User", userSchema)
module.exports = model