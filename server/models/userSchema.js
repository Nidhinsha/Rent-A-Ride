const mongoose = require('mongoose')
const shortid = require('shortid');

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
        type :String,
        default : shortid.generate()
    }
}
    , {
        timestamps: true
    }
)


const model = mongoose.model("User", userSchema)
module.exports = model