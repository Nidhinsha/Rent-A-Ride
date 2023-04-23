const bookingSchema = require("../../../models/bookingSchema")
const bikeSchema = require("../../../models/bikeSchema")
const walletSchema = require("../../../models/walletSchema")

exports.cancelBikeOrder = async (req, res) => {
    try {
        const bikeId = req.query.bikeId
        const userId = req.query.userId
        const bookingId = req.query.bookingId
        const startTime = req.query.startTime
        const endTime = req.query.endTime
        const price = req.query.price


        const removeBookedTimeFromBike= bikeSchema.updateOne(
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
        .catch((error)=>{
            res.status(400).json("error while remove time from bike collection")
        })

        const updateStateToCancel = bookingSchema.updateOne(
            {
                _id : bookingId
            },
            {
                $set:{
                    status:"cancelled"
                }
            }
        )
        .catch((error)=>{
            res.status(400).json("error while update to cancel")
        })

        await Promise.all([removeBookedTimeFromBike,updateStateToCancel])

       bookingSchema.aggregate(
        [
            {
              '$match': {
                'userId': userId
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
       .then(async(data)=>{
            const walletExist = await walletSchema.findOne(
                {
                    userId:userId
                }
            )

            if(!walletExist){
                const newWallet = {
                    userId,
                    walletAmount : price,
                    walletHistory:[
                        {
                            transactionType :"cancel refund",
                            amountAdded : price
                        }
                    ]
                }
                walletSchema.create(newWallet)
            }else{
                walletSchema.updateOne(
                    {
                        userId:userId
                    },
                    {
                        $inc:{
                            walletAmount : price
                        },
                        $push:{
                            walletHistory:{
                                transactionType:"cancel refund",
                                amountRefunded : price
                            }
                        }
                    }
                )
                .then((response)=>{
                    res.status(200).json(data)
                })
            }
       })

    } catch (error) {
        res.status(400).json("error while canceling bike order")
    }
}