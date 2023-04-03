
const bikeShema = require('../../../models/bikeSchema')

exports.accepetReqController = async(req,res)=>{
    bikeShema.updateOne({_id : req.query.id},
        {
            $set:{
                status : "accepted"
            }
        })
}