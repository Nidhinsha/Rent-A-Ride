const bikeShema = require("../../../models/bikeSchema")

exports.viewBike = async =(req,res)=>{
    try {
        bikeShema.find({status : "accepted"}).then((data)=>{
            res.status(200).json(data)
        })
    } catch (error) {
        res.status(400).json({message:"cloudn't fetch the bikes"})
    }
}