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
        success_url: 'http://localhost:3000/success',
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
            console.log('Booking slot created successfully');
        }

        res.send({ url: session.url })

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

