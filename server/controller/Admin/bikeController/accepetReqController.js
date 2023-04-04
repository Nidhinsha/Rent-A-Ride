
const bikeSchema = require('../../../models/bikeSchema')

exports.accepetReqController = async (req, res) => {
    bikeSchema.updateOne({ _id: req.query.id },
        {
            $set: {
                status:"accepted"
            }
        }).then(()=>{
            bikeSchema.find({
               status :"pending"
            }).then((data)=>{
                console.log('pending data in accept',data);
                res.status(200).json(data)
            })
        })
}