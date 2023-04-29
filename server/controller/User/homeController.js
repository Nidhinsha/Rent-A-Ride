const userSchema = require("../../models/userSchema")
const bikeSchema = require("../../models/bikeSchema")

exports.homeBikeController = async (req,res)=>{
    try {
        const bikeData = await bikeSchema.find({
            status:"accepted"
        })
        .limit(3)
        res.status(200).json(bikeData)
    } catch (error) {
        res.status(400).json({message:"error finding bikes"})
    }
}