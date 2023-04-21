const mongoose = require('mongoose');
const objectId = new mongoose.Types.ObjectId();
const bookingSchema = require("../../../models/bookingSchema")

exports.userGetBookedBikeController = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.query.id.toString());

        console.log(typeof userId,userId, 'type of userod');
       const booking =await  bookingSchema
            .aggregate(
                [
                    {
                        '$match': {
                            'userId':userId
                        }
                    }
                    , {
                        '$lookup': {
                            'from': 'bikes',
                            'localField': 'bikeId',
                            'foreignField': '_id',
                            'as': 'result'
                        }
                    }, {
                        '$project': {
                            'bikeData': {
                                '$arrayElemAt': [
                                    '$result', 0
                                ]
                            },
                            'totalHours': 1,
                            'totalAmount': 1,
                            'pickupLocation': 1,
                            'dropOffLocation': 1,
                            'needHelmet': 1,
                            'status': 1,
                            'startingTime': '$bookedTimeSlots.startDate',
                            'endingTime': '$bookedTimeSlots.endDate'
                        }
                    }, {
                        '$project': {
                            'bikeId': '$bikeData._id',
                            'bikeName': '$bikeData.bikeName',
                            'bikeModel': '$bikeData.bikeModel',
                            'color': '$bikeData.Color',
                            'totalHours': 1,
                            'totalAmount': 1,
                            'pickupLocation': 1,
                            'dropOffLocation': 1,
                            'needHelmet': 1,
                            'startingTime': 1,
                            'endingTime': 1,
                            'status': 1,
                            'photo': '$bikeData.photo',
                        }
                    }
                ]
            )
           
                res.status(200).json(booking)
                console.log(booking,'user side boking data');
          
    } catch (error) {
        res.status(400).json("error while getting data from the booked data")
        console.log(error,'catch');

    }
}
