const bookingSchema = require("../../../models/bookingSchema")
const userSchema = require("../../../models/userSchema")
const bikeSchema = require("../../../models/bikeSchema")


exports.getDashboardData = async (req,res)=>{
    try {

        // booking

        const allBooking = await bookingSchema.find()

        const totalBooking = allBooking?.length

        const pendingBooking = allBooking?.filter((booking)=>{
           return booking.status === 'booking'
        })
        const completedBooking = allBooking?.filter((booking)=>{
           return booking.status === 'completed'
        })
        const onRideBooking = allBooking?.filter((booking)=>{
           return booking.status === 'onRide'
        })
        const cancelledBooking = allBooking?.filter((booking)=>{
           return booking.status === 'cancelled'
        })

        // user 

        const allUser = await userSchema.find()

        const totalUser = allUser?.length || 0

        const blockedUser = allUser?.filter((user)=>{
         return user.status === false
         })

        const unBlockedUser = allUser?.filter((user)=>{
         return user.status === true
         })

         // bikes

         const allBikes = await bikeSchema.find({status:"accepted"}).count() || 0

         const totalOwners = await bikeSchema.countDocuments({ ownerName: { $ne: null } }) || 0

         const rendRequest = await bikeSchema.find({status:"pending"}).count() || 0

         const rejectedRequest = await bikeSchema.find({status:"rejected"}).count() || 0

         const data = {
            totalBooking,
            pendingBooking : pendingBooking?.length || 0,
            completedBooking : completedBooking?.length || 0,
            onRideBooking : onRideBooking?.length || 0,
            cancelledBooking : cancelledBooking?.length || 0,
            totalUser,
            blockedUser : blockedUser?.length || 0,
            unBlockedUser : unBlockedUser?.length || 0,
            allBikes,
            totalOwners,
            rendRequest,
            rejectedRequest
         }

        res.status(200).json(data)

    } catch (error) {
        res.status(400).json({message:"error while getting data from dashboard"})
    }
}