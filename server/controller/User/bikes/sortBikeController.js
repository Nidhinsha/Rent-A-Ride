const bikeSchema = require("../../../models/bikeSchema")

exports.sortByBikeNameAsc = (req,res)=>{
    try {
        bikeSchema.find({
                status : "accepted"
        })
        .sort({
            bikeName : -1
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((error)=>{
            res.status(400).json({message:"error in sorting"})
        })
    } catch (error) {
        
    }
}
exports.sortByBikeNameDsc = (req,res)=>{
    try {
        bikeSchema.find({
                status : "accepted"
        })
        .sort({
            bikeName : 1
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((error)=>{
            res.status(400).json({message:"error in sorting"})
        })
    } catch (error) {
        
    }
}