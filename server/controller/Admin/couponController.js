const couponSchema = require("../../models/couponSchema")

exports.addCoupon =async(req,res)=>{
    couponSchema.findOne({
        couponName : req.body.couponName
    })
    .then((couponData)=>{
        if(couponData){
            res.status(400).json("Coupon Already exits !!")
        }else{
            couponData.create(req.body).then(()=>{
                couponSchema.find().then((data)=>{
                    res.status(201).json(data)
                })
            })
        }
    })
    .catch((error)=>{
        res.status(400).json("error in creation of coupon")
    })
}

exports.getCoupons = async(req,res)=>{
    couponSchema.find().then((data)=>{
        res.status(200).json(data)
    })
    .catch(()=>{
        res.status(400).json("error in finding coupons")
    })
}

exports.editCoupon = async(req,res)=>{
    couponSchema.updateOne(
        {
            _id : req.query.id
        },
        {
            $set :{
                couponName : req.body.couponName,
                couponCode : req.body.couponCode
            }
        }
    )
    .then(()=>{
        couponSchema.find().then((data)=>{
            res.status(200).json(data)
        })
    })
    .catch(()=>{
        res.status(400).json("error in updation of coupon")
    })
}

exports.deleteCoupon = async(req,res)=>{
    couponSchema.deleteOne(
        {
            _id : req.query.id
        }
    )
    .then((data)=>{
        res.status(200).json(data)
    })
    .catch(()=>{
        res.status(400).json("error in coupon deletion !!")
    })
}