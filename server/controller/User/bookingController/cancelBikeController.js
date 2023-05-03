const bookingSchema = require("../../../models/bookingSchema")
const bikeSchema = require("../../../models/bikeSchema")
const walletSchema = require("../../../models/walletSchema")
const mongoose = require('mongoose');
const objectId = new mongoose.Types.ObjectId();

exports.cancelBikeOrder = async (req, res) => {
    try {
        const bikeId = req.query.bikeId
        const userId = req.query.userId
        const bookingId = req.query.bookingId
        const startTime = req.query.startTime
        const endTime = req.query.endTime
        const price = req.query.price


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
                res.status(400).json({ message: "error while remove time from bike collection" })
            })

        const updateStateToCancel = bookingSchema.updateOne(
            {
                _id: bookingId
            },
            {
                $set: {
                    status: "cancelled"
                }
            }
        )
            .catch((error) => {
                res.status(400).json({ message: "error while update to cancel" })
            })


        await Promise.all([removeBookedTimeFromBike, updateStateToCancel])

        const walletExist = await walletSchema.findOne(
            {
                userId: userId
            }
        )

        if (!walletExist) {
            const newWallet = {
                userId,
                walletAmount: price,
                walletHistory: [
                    {
                        transactionType: "cancel refund",
                        amountAdded: price
                    }
                ]
            }
            walletSchema.create(newWallet)
        } else {
            walletSchema.updateOne(
                {
                    userId: userId
                },
                {
                    $inc: {
                        walletAmount: price
                    },
                    $push: {
                        walletHistory: {
                            transactionType: "cancel refund",
                            amountAdded: price
                        }
                    }
                }
            )
            .then(() => {
                bookingSchema.find({ userId: userId })
                .find({ userId: userId }).populate('bikeId')
                .then((data) => {
                    res.status(200).json(data);
                })
                .catch((err) => {
                    res.status(500).json({ message: 'Internal server error' });
                });
                   
            })
        }



    } catch (error) {
        res.status(400).json({ message: "error while canceling bike order" })
    }
}