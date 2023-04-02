const bikeSchema = require(".././../../models/bikeSchema")

exports.deleteBike = async(req,res)=>{
    bikeSchema.deleteOne({
        _id : req.query.id
    }).then(()=>{
        bikeSchema.find({
            status : "accepted"
        })
        .then((data)=>{
            res.status(200).json(data)
        })
        .catch((error)=>{
            res.status(400).json("Error in the deletion of bike")
        })
    })
}