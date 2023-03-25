const bikeSchema = require("../../../models/bikeSchema")


exports.userRentRequest = async(req,res)=>{
    try {
        bikeSchema.find({status:"pending"}).then((data)=>{
            res.status(200).json(data)
        })
    } catch (error) {
        res.status(401).json({message:"cloudn't fetch the pending bikes"})
    }
}