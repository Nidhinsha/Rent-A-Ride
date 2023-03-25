
const bikeShema = require('../../../models/bikeSchema')

exports.accepetReqController = async(req,res)=>{
    console.log(req.query.id,'id form the accept-req');
    bikeShema.updateOne({_id : req.query.id},
        {
            $set:{
                status : "accepted"
            }
        }).then(()=>{
            console.log("it is working the req..");
        })
}