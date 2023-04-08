const bookingSchema = require("../../models/bookingSchema")
const bikeSchema = require("../../models/bikeSchema")

exports.bikeBookingController = async (req, res) => {
    req.body.bookingDetails.transactionId = "1234"
    bookingSchema.create(req.body.bookingDetails).then(() => {

        const bikeId = req.body.bookingDetails.bikeId
        const bookedTimeSlots = req.body.bookingDetails.bookedTimeSlots

        bikeSchema.findById(bikeId).then((bike) => {
            if (bike.bookedTimeSlots) {
                bike.bookedTimeSlots.push(bookedTimeSlots);
            } else {
                bike.bookedTimeSlots = [bookedTimeSlots];
            }
            bike.save()
                .then(() => {
                    res.status(201).json("Booking SuccesFull")
                })
                .catch((error) => {
                    res.status(400).json("Error while updating bike booking!!!!")
                    console.log('error ', error);
                })
        })
            .catch((error) => {
                res.status(400).json("Error while finding bike!!");
                console.log("Error:", error);
            });
    })
    .catch((error) => {
        res.status(400).json("Error while booking bike!!");
        console.log("Error:", error);
    });

}