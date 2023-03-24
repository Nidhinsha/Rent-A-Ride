const bikeSchema = require("../../../models/bikeSchema")


exports.rejectReqController = async(req,res)=>{

    bikeSchema.updateOne({_id : req.query.id},
        {
            $set :{
                status : "rejected"
            }
        }).then(()=>{
            console.log("the bike req rejected...");
        })
}