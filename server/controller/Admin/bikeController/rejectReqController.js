const bikeSchema = require("../../../models/bikeSchema")


exports.rejectReqController = async(req,res)=>{

    bikeSchema.updateOne({_id : req.query.id},
        {
            $set :{
                status : "rejected"
            }
        }).then(()=>{
            bikeSchema.find({
               status :"pending"
            }).then((data)=>{
                console.log('pending data in reject',data);
                res.status(200).json(data)
            })
        })
}