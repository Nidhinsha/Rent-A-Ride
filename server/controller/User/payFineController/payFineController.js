const bookingSchema = require("../../../models/bookingSchema")
const bikeSchema = require("../../../models/bikeSchema")
const moment = require("moment")
const dotenv = require('dotenv')
dotenv.config()
const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

exports.payFine = async (req, res) => {
    let session
    try {
        const { bikeId, bookingId, startTime, endTime, price, photo, bikeName } = req.body.fineData
        const userId = req.query.id

        let currentTime = moment().format("MMMM Do YYYY, h:mm:ss a");

        let currTime = moment(currentTime, "MMMM Do YYYY, h:mm:ss a");
        let eTime = moment(endTime, "MMMM Do YYYY, h:mm:ss a");

        let diffInHours = currTime.diff(eTime, "hours");

        let totalFine = diffInHours > 0 ? diffInHours * 30 : 30;

        session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: bikeName,
                            images: photo,
                            description: "fine for exceeding the ride",
                            metadata: {
                                bike_id: bikeId,
                            }
                        },
                        unit_amount: totalFine * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:3000/userFine-payment-success?userId=${userId}&bikeId=${bikeId}&bookingId=${bookingId}&startTime=${startTime}&endTime=${endTime}`,

            cancel_url: 'http://localhost:3000/cancel',
        });
        res.status(200).json({ url: session.url })
    } catch (error) {
        console.log(error, 'eror payment acton backend');
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.finePaymentSuccess = async (req, res) => {
    try {
        const { bikeId, bookingId, startTime, endTime, price, photo, bikeName } = req.body.fineData
        const bikes = await bikeSchema.updateOne(
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

        const booking = await bookingSchema.updateOne(
            {
                _id: bookingId
            },
            {
                $set: {
                    status: "completed"
                }
            }
        )
    } catch (error) {
        console.log(error, 'fine paymet success error');
        res.status(400).json({ message: "error while fine payment" })
    }
}
