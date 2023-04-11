const bookingSchema = require("../../models/bookingSchema")
const bikeSchema = require("../../models/bikeSchema")
const dotenv = require('dotenv')
dotenv.config()
const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)



exports.bikeBookingController = async (req, res) => {

    const { userName, userId, bikeId, bikeData, totalAmount, totalHours, needHelmet, bookedTimeSlots, pickupLocation, dropOffLocation } = req.body.bookingData

    const session = await stripe.checkout.sessions.create({
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
        success_url: 'http://localhost:3000/booked-bike',
        cancel_url: 'http://localhost:4242/cancel',
    });

    // create a new booking object with the booking data
    const booking = new bookingSchema({
        userId: userId,
        bikeId: bikeId,
        totalAmount: totalAmount,
        totalHours: totalHours,
        needHelmet: needHelmet,
        bookedTimeSlots: bookedTimeSlots,
        pickupLocation: pickupLocation,
        dropOffLocation: dropOffLocation,
        stripeSessionId: session.id // store the session id for future reference
    });

    // save the booking object to the database
    try {
        await booking.save();
        console.log('Booking saved successfully');

        // find the bike in the database and update its booking slot field
        const bike = await bikeSchema.findOneAndUpdate(
            { _id: bikeId },
            { $push: { bookedTimeSlots: bookedTimeSlots } },
            { new: true }
        );

        // if the bike does not have any booking slots, create a new array and add the booking slot
        if (!bike.bookedTimeSlots) {
            bike.bookedTimeSlots = [bookedTimeSlots];
            await bike.save();
            
        }

        res.send({ url: session.url })

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

exports.userGetBookedBikeController = async (req, res) => {
    try {
        const userId = req.query.id;
        const bookingsWithBikes = await bookingSchema
            .aggregate(
                [
                    { $match: { userId } },

                    {
                        '$lookup': {
                            'from': 'bikes',
                            'localField': 'bikeId',
                            'foreignField': '_id',
                            'as': 'bikeData'
                        }
                    },
                    {
                        $project: {

                            bookingId: '$_id',
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

                        }
                    }, {
                        $project: {
                            pickupLocation: 1,
                            dropOffLocation: 1,
                            totalAmount: 1,
                            totalHours: 1,
                            needHelmet: 1,
                            bookedTimeSlots: 1,
                            description:1,
                            bookingId: 1,
                            bikeName: 1,
                            bikeModel: 1,
                            rentPerHour: 1,
                            photo: { $arrayElemAt: ["$photo", 0] },

                        }
                    }
                ])
        res.status(200).json(bookingsWithBikes)
    } catch (error) {
        res.json(400).json("error while getting data from the booked data")

    }
}
