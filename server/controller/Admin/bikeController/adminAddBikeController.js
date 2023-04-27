const bikeSchema = require("../../../models/bikeSchema")
const cloudinary = require("../../../utils/cloudinary")
const upload = require("../../../utils/multer")
const path = require('path')
const fs = require('fs')


exports.addBike = async (req, res) => {

    try {
        const uploader = async (path) => await cloudinary.uploads(path,'Images')

        if (req.method === 'POST') {
            const urls = []
            const files = req.files

            for (const file of files) {
                const { path } = file

                const newPath = await uploader(path)
                urls.push(newPath)
                fs.unlinkSync(path)
            }


            let photo = []

            for (let i = 0; i < urls.length; i++) {
                photo.push(urls[i].url)  
            }

            const bikeDetails = {
                ownerName : req.body.ownerName,
                bikeName : req.body.bikeName,
                bikeModel : req.body.bikeModel,
                engineNumber : req.body.engineNumber,
                assured : true,
                brand : req.body.brand,
                color : req.body.color,
                fuel : req.body.fuel ,
                description : req.body.description,
                location : req.body.location,
                price : req.body.price,
                status:"accepted",
                photo
            }

            bikeSchema.create(bikeDetails).then((data)=>{
                res.status(200).json(data)
            })


        }else{
            res.status(405).json({
                error : `${req.method} method is not allowed`
            })
        }
    } catch (error) {
        res.status(500).json({message:"error in adding bike"})
    }
}