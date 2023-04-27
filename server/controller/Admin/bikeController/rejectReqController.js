const bikeSchema = require("../../../models/bikeSchema")


exports.rejectReqController = async(req,res)=>{
    try {
      await  bikeSchema.updateOne({_id : req.query.id},
            {
                $set :{
                    status : "rejected"
                }
            })
            
            const pendingData = await bikeSchema.find({
                   status :"pending"
                })
            res.status(200).json(pendingData)
           
    } catch (error) {
        res.status(500).json({message:"error in rejecting user"})
    }

   
}