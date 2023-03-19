const mongoose = require("mongoose")

const bikeSchema = new mongoose.Schema({
    ownerName : {
        type:String
        // required : true
    },
    bikeName : {
        type:String,
        // required :true
    },
    bikeModel : {
        type:String,
        // required :true
    },
    brand : {
        type:String,
        required :true
    },
    color :{
        type:String,
        // required :true
    },
    fuel :{
        type:String,
        // required :true
    },
    description : {
        type : String,
        // required :true
    },
    price : {
        type : Number,
        // required :true
    },
    image1 :{
        type:String
    },
    image2 :{
        type:String
    },
    image3 :{
        type:String
    },
    image4 :{
        type:String
    }
})

const model = mongoose.model("bikes",bikeSchema)

module.exports = model