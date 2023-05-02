const bikeSchema = require("../../models/bikeSchema")
const cloudinary = require("../../utils/cloudinary")
const upload = require("../../utils/multer")
const path = require("path")
const fs = require("fs")

exports.userAddBike = async (req,res)=>{
    console.log(req.body,'user bike data from user');

    try {
        const uploader = async (path) => await cloudinary.uploads(path,"Images")

        if(req.method === 'POST'){
            const urls = []
            const files = req.files

            for (const file of files) {
                const {path} = file

                const newPath = await uploader(path)
                urls.push(newPath)
                fs.unlinkSync(path)
            }

            let photo = []

            for(let i = 0;i<urls.length;i++){
                photo.push(urls[i].url)
            }

            let bikeDetails = {
                ownerId : req.query.id,
                ownerName : req.body.ownerName,
                bikeName : req.body.bikeName,
                bikeModel : req.body.bikeModel,
                engineNumber : req.body.engineNumber,
                assured : false,
                brand : req.body.brand,
                color : req.body.color,
                fuel : req.body.fuel ,
                description : req.body.description,
                price : req.body.price,
                photo,
                status : "pending",
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
        res.status(400).json({message:"error in adding bike"})
    }
}