const mongoose = require("mongoose")

const bikeSchema = new mongoose.Schema({
    ownerId : {
        type:String
        // required : true
    },
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
    engineNumber:{
        type : String
    },
    brand : {
        type:String,
        // required :true
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
    location:{
        type:String
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