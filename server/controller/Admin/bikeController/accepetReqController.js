
const bikeSchema = require('../../../models/bikeSchema')

exports.accepetReqController = async (req, res) => {
    try {
        const updateToAccepted = await bikeSchema.updateOne({ _id: req.query.id },
            {
                $set: {
                    status: "accepted"
                }
            })
            
        const findPendingReq = await bikeSchema.find({
            status: "pending"
        })
        res.status(200).json(findPendingReq)

    } catch (error) {
        res.status(500).json({message:"error while updating"})
    }

}