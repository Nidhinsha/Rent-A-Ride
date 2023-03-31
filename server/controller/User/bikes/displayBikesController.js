const bikeSchema = require("../../../models/bikeSchema")

exports.displayBikeController = async(req,res)=>{
    try {
        bikeSchema.find({status :"accepted"}).then((data)=>{
           
            res.status(200).json(data)
        })
    } catch (error) {
        res.status(400).json({message:"cloud'nt fetch the data from the store"})
    }
}