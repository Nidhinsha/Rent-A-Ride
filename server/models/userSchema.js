const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    picture: {
        type: String,
        required: true,
        default:
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
}
    , {
        timestamps: true
    })

// userSchema.methods.generateAuthToken = function(){
//     const token = jwt.sign({_id:this.id},'RENTANDRIDEUSER',{expiresIn:"7d"})
//     return token
// }

const model = mongoose.model("User", userSchema)
module.exports = model