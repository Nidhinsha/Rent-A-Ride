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
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
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