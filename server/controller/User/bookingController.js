const bookingSchema = require("../../models/bookingSchema")
const bikeSchema = require("../../models/bikeSchema")
const couponSchema = require("../../models/couponSchema")
const walletSchema = require("../../models/walletSchema")
const dotenv = require('dotenv')
dotenv.config()
const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
const moment = require("moment")



exports.bikeBookingController = async (req, res) => {
    console.log(req.body.bookingDetails);
    const { userName, userId, bikeId, bikeData, totalAmount, totalHours, needHelmet, bookedTimeSlots, pickupLocation, dropOffLocation, couponCode, paymentType } = req.body.bookingDetails


    let session
    try {
        const startingTime = bookedTimeSlots.startDate
        const endingTime = bookedTimeSlots.endDate
        let status = true

        const checkDate = await bikeSchema.findOne({ _id: bikeId })

        for (let i = 0; i < checkDate.bookedTimeSlots.length; i++) {
            if (startingTime > checkDate.bookedTimeSlots[i].endDate) {
                status = true
            } else if (startingTime && endingTime <= checkDate.bookedTimeSlots[i].endDate) {
                status = false
            }

        }

        // status true
        if (status === true) {
            if (paymentType === "stripe") {
                session = await stripe.checkout.sessions.create({
                    line_items: [
                        {
                            price_data: {
                                currency: 'inr',
                                product_data: {
                                    name: bikeData.bikeName,
                                    images: [bikeData.photo[0]],
                                    description: bikeData.description,
                                    metadata: {
                                        bike_id: bikeId,
                                        totalHours: totalHours,
                                        needHelmet: needHelmet,
                                        pickupLocation: pickupLocation,
                                        dropOffLocation: dropOffLocation,
                                        startDate: bookedTimeSlots.startDate,
                                        endDate: bookedTimeSlots.endDate
                                    }
                                },
                                unit_amount: totalAmount * 100,
                            },
                            quantity: 1,
                        },
                    ],
                    mode: 'payment',
                    success_url: `http://localhost:3000/booking-success?userId=${userId}&bikeId=${bikeId}&userName=${userName}
                                          &startDate=${bookedTimeSlots.startDate}&endDate=${bookedTimeSlots.endDate}&photo=${bikeData.photo[0]}
                                          &bikeName=${bikeData.bikeName}&bikeModel=${bikeData.bikeModel}&totalAmount=${totalAmount}&totalHours=${totalHours}
                                          &needHelmet=${needHelmet}&pickupLocation=${pickupLocation}
                                          &dropOffLocation=${dropOffLocation}&couponCode=${couponCode}&paymentType=${paymentType}`,

                    cancel_url: 'http://localhost:3000/cancel',
                });
                res.status(200).json({ url: session?.url })
            }
        } else {
            console.log('status fals');
            res.status(400).json("the slot is already booked.please select another slot thankyou")
        }
    } catch (error) {

    }
}

exports.userCreateOrderController = async (req, res) => {
    try {
        const { userId, userName, bikeId, bikeName, bikeModel, photo, totalAmount, totalHours, bookedTimeSlots, pickupLocation, dropOffLocation, needHelmet, paymentType, couponCode } = req.body.bookingDetails
        const booking = new bookingSchema({
            userId: userId,
            bikeId: bikeId,
            bikeName: bikeName,
            bikeModel: bikeModel,
            photo: photo,
            totalAmount: totalAmount,
            totalHours: totalHours,
            needHelmet: needHelmet,
            bookedTimeSlots: bookedTimeSlots,
            pickupLocation: pickupLocation,
            dropOffLocation: dropOffLocation,
            couponCode: couponCode,
            paymentType: paymentType,
            status: "booked",
            bookedAt: moment().format('MMMMM Do YYYY,h:mm:ss a')
        })

        try {
            await booking.save()
            // find the bike in the database and update its booking slot field
            const bike = await bikeSchema.findOneAndUpdate(
                { _id: bikeId },
                { $push: { bookedTimeSlots: bookedTimeSlots } },
                { new: true }
            )

            // if the bike does not have any booking slots, create a new array and add the booking slot
            if (!bike.bookedTimeSlots) {
                bike.bookedTimeSlots = [bookedTimeSlots];
                await bike.save();
            }

           
            // checking coupon
            if (couponCode !== "null" && couponCode !== '') {
                couponSchema.updateOne(
                    {
                        couponCode: couponCode
                    },
                    {
                        $push: {
                            users: {
                                userId: userId
                            }
                        }
                    }
                )
                    .then((response) => {
                        console.log(response, 'respones');
                    })
            }

            // setting up the wallet
            // and sending money to the owner of the bike after renting it

            const bikeData = await bikeSchema.findOne({
                $and: [
                    {
                        _id: bikeId
                    },
                    {
                        ownerId: {
                            $exists: true
                        }
                    }
                ]
            })

            if (bikeData) {
                let walletExists = await walletSchema.findOne({
                    userId: bikeData.ownerId
                })
                let withOutCouponAmountToUser
                let bookingAmount
                let price

                // checking if the coupon is applied

                if (couponCode !== "null") {
                    couponSchema.findOne(
                        {
                            couponCode: couponCode
                        }
                    )
                        .then((couponData) => {
                            price = couponData.couponPrice
                            withOutCouponAmountToUser = parseInt(totalAmount) + parseInt(price)
                            bookingAmount = withOutCouponAmountToUser * 0.25

                            if (!walletExists) {
                                bookingAmount = totalAmount * 0.25
                                const newWallet = {
                                    userId: bikeData.ownerId,
                                    walletAmount: withOutCouponAmountToUser * 0.25,
                                    walletHistory: [
                                        {
                                            transactionType: "rented bike share",
                                            amountAdded: withOutCouponAmountToUser * 0.25
                                        }
                                    ]
                                }
                                walletSchema.create(newWallet)
                            } else {
                                walletSchema.updateOne(
                                    {
                                        userId: walletExists.userId
                                    },
                                    {
                                        $inc: {
                                            walletAmount: withOutCouponAmountToUser * 0.25
                                        },
                                        $push: {
                                            walletHistory: {
                                                transactionType: "rented bike share",
                                                amountAdded: withOutCouponAmountToUser * 0.25
                                            }
                                        }
                                    }
                                )
                                    .then((response) => {
                                        console.log(response, 'response of money added to the wallet after rented it');
                                    })
                            }
                        })
                } else if (couponCode === "null") {
                    if (!walletExists) {
                        bookingAmount = totalAmount * 0.25

                        const newWallet = {
                            userId: bikeData.ownerId,
                            walletAmount: bookingAmount,
                            walletHistory: [
                                {
                                    transactionType: "rented bike share",
                                    amountAdded: bookingAmount
                                }
                            ]
                        }
                        walletSchema.create(newWallet)
                    } else {
                        walletSchema.updateOne(
                            {
                                userId: walletExists.userId
                            },
                            {
                                $inc: {
                                    walletAmount: totalAmount * 0.25
                                },
                                $push: {
                                    walletHistory: {
                                        transactionType: "rented bike share",
                                        amountAdded: totalAmount * 0.25
                                    }
                                }
                            }
                        )
                            .then((response) => {
                                console.log(response, 'the response yo');
                            })
                    }
                }
            } else {
                console.log('nothing');
            }

        } catch (error) {
            res.status(500).json("server error")
        }
    } catch (error) {
        console.log(error,'first try error');
    }
}

exports.userGetBookedBikeController = async (req, res) => {
    try {
        const userId = req.query.id;
        console.log(typeof userId,'type of');
       bookingSchema
            .aggregate(
                // [
                //     {
                //       '$match': {
                //         'userId': userId
                //       }
                //     }, {
                //       '$lookup': {
                //         'from': 'bikes', 
                //         'localField': 'bikeId', 
                //         'foreignField': '_id', 
                //         'as': 'result'
                //       }
                //     }, {
                //       '$project': {
                //         'bikeData': {
                //           '$arrayElemAt': [
                //             '$result', 0
                //           ]
                //         }, 
                //         'totalHours': 1, 
                //         'totalAmount': 1, 
                //         'pickupLocation': 1, 
                //         'dropOffLocation': 1, 
                //         'needHelmet': 1, 
                //         'status' : 1,
                //         'startingTime': '$bookedTimeSlots.startDate', 
                //         'endingTime': '$bookedTimeSlots.endDate'
                //       }
                //     }, {
                //       '$project': {
                //         'bikeId' : '$bikeData._id',
                //         'bikeName': '$bikeData.vehicleName', 
                //         'bikeModel': '$bikeData.vehicleModel', 
                //         'color': '$bikeData.Color', 
                //         'totalHours': 1, 
                //         'totalAmount': 1, 
                //         'pickupLocation': 1, 
                //         'dropOffLocation': 1, 
                //         'needHelmet': 1, 
                //         'startingTime': 1, 
                //         'endingTime': 1, 
                //         'status' : 1,
                //         'photo': '$bikeData.photo', 
                //       }
                //     }
                //   ]
                [
                    {
                      '$match': {
                        'userId': userId
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
                        'dropOffLocation':1,
                        'needHelmet': 1, 
                        'status' : 1,
                        'startingTime': '$bookedTimeSlots.startDate', 
                        'endingTime': '$bookedTimeSlots.endDate'
                      }
                    }, {
                      '$project': {
                        'bikeId' : '$bikeData._id',
                        'bikeName': '$bikeData.bikeName', 
                        'bikeModel': '$bikeData.bikeModel', 
                        'color': '$bikeData.Color', 
                        'totalHours': 1, 
                        'totalAmount': 1, 
                        'pickupLocation': 1, 
                        'dropOffLocation':1,
                        'needHelmet': 1, 
                        'startingTime': 1, 
                        'endingTime': 1, 
                        'status' : 1,
                        'photo': '$bikeData.photo', 
                      }
                    }
                  ]
                )
                .then((data)=>{
                    // console.log('booking with bikes',data);
                    res.status(200).json(data)
                })
    } catch (error) {
        res.json(400).json("error while getting data from the booked data")

    }
}
