const bikeSchema = require('../../../models/bikeSchema')
const path = require('path')
const fs = require('fs')
const cloudinary = require("../../../utils/cloudinary")
const upload = require("../../../utils/multer")

exports.editBike = async(req,res)=>{
    const uploader = async (path) => await cloudinary.uploads(path,'Images')
try {

    if(req.method === 'POST'){
        const urls = []
        const files = req.files

        for (const file of files) {
            const {path} = file

            const newPath = await uploader(path)
            urls.push(newPath)
            fs.unlinkSync(path)
        }

        if(urls.length > 0){

            let photo =[]

            for (let i = 0; i < urls.length; i++) {
                photo.push(urls[i].url) 
                 
            }

            bikeSchema.updateOne(
                {_id : req.query.id},
                {
                    $set:{
                        ownerName : req.body.ownerName,
                        bikeName : req.body.bikeName,
                        bikeModel : req.body.bikeModel,
                        engineNumber : req.body.engineNumber,
                        color : req.body.color,
                        brand : req.body.brand,
                        fuel : req.body.fuel,
                        description : req.body.description,
                        price : req.body.price,
                        location : req.body.location,
                        status : req.body.status,
                        photo
                    }
                }
            ).then(()=>{
                bikeSchema.findOne({_id : req.query.id})
            })
        }else{
         
            const newURLS = req.body.imageUrl.split(",")

            bikeSchema.updateOne(
                {_id : req.query.id},
                {
                    $set:{
                        ownerName : req.body.ownerName,
                        bikeName : req.body.bikeName,
                        bikeModel : req.body.bikeModel,
                        engineNumber : req.body.engineNumber,
                        color : req.body.color,
                        brand : req.body.brand,
                        fuel : req.body.fuel,
                        description : req.body.description,
                        price : req.body.price,
                        location : req.body.location,
                        status : req.body.status,
                        photo : newURLS
                    }
                }
            ).then((data)=>{
                bikeSchema.findOne({_id : req.query.id})
            })
        }
    }
    
} catch (error) {
    res.status(500).json({message:"error in updating bike"})
}
    
}
