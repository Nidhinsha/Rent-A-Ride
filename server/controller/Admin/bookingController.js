const bookingSchema = require("../../models/bookingSchema")
const moment = require("moment")

exports.adminGetBookedBikeController = async (req, res) => {
  try {
    const data = await bookingSchema.
      aggregate(
        [
          {
            '$lookup': {
              'from': 'users',
              'localField': 'userId',
              'foreignField': '_id',
              'as': 'userData'
            }
          }, {
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
              'userData': {
                '$arrayElemAt': [
                  '$userData', 0
                ]
              },
              'totalHours': 1,
              'totalAmount': 1,
              'needHelmet': 1,
              'pickupLocation': 1,
              'dropOffLocation': 1,
              'startDate': '$bookedTimeSlots.startDate',
              'endDate': '$bookedTimeSlots.endDate',
              'status': 1,
              'paymentType': 1,
              'bookedAt': 1
            }
          },
          {
            '$project': {
              'totalHours': 1,
              'totalAmount': 1,
              'needHelmet': 1,
              'pickupLocation': 1,
              'dropOffLocation': 1,
              'startDate': 1,
              'endDate': 1,
              'status': 1,
              'paymentType': 1,
              'bookedAt': 1,
              'bikeName': '$bikeData.bikeName',
              'photo': '$bikeData.photo',
              'userName': '$userData.firstName'
            }
          }
        ]
      )

    try {
      let currentTime = moment().format('X');

      for (let i = 0; i < data.length; i++) {

        let startTime = moment(data[i].startDate, 'MMMM Do YYYY, h:mm:ss a').unix()
        let endTime = moment(data[i].endDate, 'MMMM Do YYYY, h:mm:ss a').unix()


        if (currentTime > endTime && data[i].status !== 'completed') {
          try {
            await bookingSchema.findOneAndUpdate(
              {
                _id: data[i]._id
              },
              {
                $set: {
                  status: "time exceeded"
                }
              }
            );
          } catch (error) {
            return res.status(500).json({
              message: `Error updating booking ${data[i]._id}`,
              error: error.message
            });
          }

        } else if (currentTime < startTime && data[i].status !== 'cancelled') {

          try {
            await bookingSchema.findOneAndUpdate(
              {
                _id: data[i]._id
              },
              {
                $set: {
                  status: "booked"
                }
              }
            );
          } catch (error) {
            return res.status(500).json({
              message: `Error updating booking ${data[i]._id}`,
              error: error.message
            });
          }


        } else if (currentTime >= startTime && currentTime <= endTime && data[i].status !== "completed") {

          try {
            await bookingSchema.findOneAndUpdate(
              {
                _id: data[i]._id
              },
              {
                $set: {
                  status: "onRide"
                }
              }
            );
          } catch (error) {
            return res.status(500).json({
              message: `Error updating booking ${data[i]._id}`,
              error: error.message
            });
          }
        }
      }

      res.status(200).json(data)
    } catch (error) {
      res.status(400).json({message:"error in booking"})
    }


  } catch (error) {
    res.status(400).json({ message: "error while fetching data" })
  }
}