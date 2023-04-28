const couponSchema = require("../../models/couponSchema")

exports.userGetCoupons = async(req,res)=>{
    couponSchema.find().then((data)=>{
        res.status(200).json(data)
    })
    .catch((error)=>{
        res.status(400).json({message:"error in finding coupons"})
    })
}