const bookingSchema = require("../../../models/bookingSchema")

exports.bikesReportData =async (req,res)=>{
    try {
        const reportData = await bookingSchema.find().populate('bikeId')

        res.status(200).json(reportData)

    } catch (error) {
        res.status(400).json({message:"error while finding report data"})
    }
}