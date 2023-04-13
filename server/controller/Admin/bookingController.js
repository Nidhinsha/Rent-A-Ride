const bookingSchema = require("../../models/bookingSchema")

exports.adminGetBookedBikeController = async(req,res)=>{
    try {
       const data=await bookingSchema.
        aggregate(
            [
                {
                  '$lookup': {
                    'from': 'bikes', 
                    'localField': 'bikeId', 
                    'foreignField': '_id', 
                    'as': 'bikeData'
                  }
                }, {
                  '$lookup': {
                    'from': 'users', 
                    'localField': 'userId', 
                    'foreignField': '_id', 
                    'as': 'userData'
                  }
                },
                {
                    '$project':{
                        bookingId : '$_id',
                        bikeName: { $arrayElemAt: ['$bikeData.bikeName', 0] },
                        description: { $arrayElemAt: ['$bikeData.description', 0] },
                        rentPerHour: { $arrayElemAt: ['$bikeData.price', 0] },
                        photo: { $arrayElemAt: ['$bikeData.photo', 0] },
                        pickupLocation: 1,
                        dropOffLocation: 1,
                        totalAmount: 1,
                        totalHours: 1,
                        needHelmet: 1,
                        bookedTimeSlots: 1,
                        userName : { $arrayElemAt: ['$userData.firstName', 0] }

                    }
                }
              ]
        )
        res.status(200).json(data)

    } catch (error) {
        res.status(400).json("error while fetching data")
    }
}