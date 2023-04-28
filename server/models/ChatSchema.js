const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
    message:{
        text:{
            type:String,
            default:''
        },
        image:{
            type:String,
            default:''
        }
    },
    users: {
        type: Array
    },
    sender: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},
    {
        timestamps:true
    }
)

const model = mongoose.model("Chat",chatSchema)
module.exports = model