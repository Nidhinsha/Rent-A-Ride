const bookingSchema = require("../../../models/bookingSchema")
const bikeSchema = require("../../../models/bikeSchema")
const couponSchema = require("../../../models/couponSchema")
const walletSchema = require("../../../models/walletSchema")
const moment = require("moment")


exports.userCreateOrderController = async (req, res) => {
    try {
        const { userId, bikeData, bikeId, totalAmount, totalHours, bookedTimeSlots, pickupLocation, dropOffLocation, needHelmet, paymentType, couponCode } = req.body.bookingDetails
        const booking = new bookingSchema({
            userId: userId,
            bikeId: bikeId,
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
                        console.log(couponData?.couponPrice,'coupon price  when couponcoe !== null');
                        price = couponData?.couponPrice
                        withOutCouponAmountToUser = parseInt(totalAmount) + parseInt(price)
                        bookingAmount = withOutCouponAmountToUser * 0.25

                        if (!walletExists) {
                            
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
                    console.log(couponData?.couponPrice,'coupon price  when couponcoe === null');
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
                            console.log(response,'the response yo');
                        })
                    }
                }
            } else {
                console.log('nothing ');
            }

        } catch (error) {
            res.status(500).json("server error")
        }
    } catch (error) {
        console.log(error, 'first try error');
    }
}