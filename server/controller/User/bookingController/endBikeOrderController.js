const bookingSchema = require("../../../models/bookingSchema")
const bikeSchema = require("../../../models/bikeSchema")
const mongoose = require('mongoose');

exports.endBikeOrder = async (req, res) => {
  try {
    const bikeId = req.query.bikeId
    const userId = req.query.userId
    const bookingId = req.query.bookingId
    const startTime = req.query.startTime
    const endTime = req.query.endTime
    const price = req.query.price

    const userIdObject = new  mongoose.Types.ObjectId(userId)

    console.log(bikeId, userId, bookingId, startTime, endTime, price, 'theh cpmolted');

    const removeBookedTimeFromBike = bikeSchema.updateOne(
      {
        _id: bikeId
      },
      {
        $pull: {
          bookedTimeSlots: {
            startDate: startTime,
            endDate: endTime
          }
        }
      }
    )
      .catch((error) => {
        res.status(400).json("error while remove time from bike collection")
      })

    const updateStateToCompleted = bookingSchema.updateOne(
      {
        _id: bookingId
      },
      {
        $set: {
          status: "completed"
        }
      }
    )
      .catch((error) => {
        res.status(400).json("error while update to complete")
      })

    await Promise.all([removeBookedTimeFromBike, updateStateToCompleted])


    const data = await bookingSchema.aggregate(
      [
        {
          '$match': {
            'userId': userIdObject
          }
        }
        , {
          '$lookup': {
            'from': 'bikes',
            'localField': 'bikeId',
            'foreignField': '_id',
            'as': 'bikeData'
          }
        }, {
          '$project': {
            'bikeData': {
              '$arrayElemAt': [
                '$bikeData', 0
              ]
            },
            'totalAmount': 1,
            'totalHours': 1,
            'startDate': '$bookedTimeSlots.startDate',
            'endDate': '$bookedTimeSlots.endDate',
            'pickupLocation': 1,
            'dropOffLocation': 1,
            'needHelmet': 1,
            'status': 1
          }
        }, {
          '$project': {
            'bikeName': '$bikeData.bikeName',
            'bikeModel': '$bikeData.bikeModel',
            'color': '$bikeData.color',
            'totalAmount': 1,
            'totalHours': 1,
            'startDate': 1,
            'endDate': 1,
            'pickupLocation': 1,
            'dropOffLocation': 1,
            'status': 1,
            'photo': '$bikeData.photo'
          }
        }
      ]
    )
    res.status(200).json(data)



  } catch (error) {
    res.status(400).json(error)
    console.log(error, 'error in set to end ride');
  }
}