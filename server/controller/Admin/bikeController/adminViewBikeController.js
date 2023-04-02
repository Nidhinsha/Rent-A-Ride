const bikeShema = require("../../../models/bikeSchema")

exports.viewBike = async =(req,res)=>{
    console.log('view bike ctrl');
    try {
        bikeShema.find({status : "accepted"}).then((data)=>{
            console.log(data,'data accepted');
            res.status(200).json(data)
        })
    } catch (error) {
        res.status(400).json({message:"cloudn't fetch the bikes"})
    }
}