const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema({
    bikeId : {
        type : mongoose.Schema.Types.ObjectId // Change the type to ObjectId
    },
    userId :{
        type : String
    },
    
    bookedTimeSlots:{
       startDate : {
        type :String
       },
       endDate :{
        type :String
       }   
    },
    pickupLocation:{
        type : String
    },
    dropOffLocation :{
        type : String
    },
    needHelmet:{
        type : Boolean
    },
    totalHours :{
        type : Number
    },
    totalAmount :{
        type :Number
    },
    stripeSessionId :{
        type : String
    },
    status:{
        type : String
    },
    paymentType :{
        type :String
    },
    bookedAt:{
        type : String
    }
},{
    timestamps : true
}
)

const model = mongoose.model("Booking",bookingSchema)

module.exports = model