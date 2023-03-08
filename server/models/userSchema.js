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
        required: true
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
        default : true
    }
})

// userSchema.methods.generateAuthToken = function(){
//     const token = jwt.sign({_id:this.id},'RENTANDRIDEUSER',{expiresIn:"7d"})
//     return token
// }

const model = mongoose.model("User",userSchema)
module.exports = model