const mongoose = require("mongoose")

const bikeSchema = new mongoose.Schema({
    ownerId : {
        type:String,
        ref:"User"
    },
    ownerName : {
        type:String
    },
    bikeName : {
        type:String,
    },
    bikeModel : {
        type:String,
    },
    engineNumber:{
        type : String
    },
    brand : {
        type:String,
    },
    color :{
        type:String,
    },
    fuel :{
        type:String,
    },
    description : {
        type : String,
    },
    price : {
        type : Number,
    },
   photo:[]
   ,
   assured :{
        type:Boolean,
        default:false
   },
   status:{
    type:String
   },
   bookedTimeSlots:[{
    startDate : {
     type :String
    },
    endDate :{
     type :String
    }   
 }],

})

const model = mongoose.model("bikes",bikeSchema)

module.exports = model