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

    const userIdObject = new mongoose.Types.ObjectId(userId)

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
        res.status(400).json({message:"error while remove time from bike collection"})
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
        res.status(400).json({message:"error while update to complete"})
      })

    await Promise.all([removeBookedTimeFromBike, updateStateToCompleted])



    const data = await bookingSchema.find({ userId: userId })
      .find({ userId: userId }).populate('bikeId')
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(500).json({ message: 'Internal server error' });
      });

    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({message:"error in completing the ride"})
  }
}