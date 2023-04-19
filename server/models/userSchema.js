const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: Number,
    },
    password: {
        type: String,
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
    },
    referalCode:{
        type :String
    }
}
    , {
        timestamps: true
    }
)


const model = mongoose.model("User", userSchema)
module.exports = model