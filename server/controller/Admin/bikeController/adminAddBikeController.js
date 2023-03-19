const bikeSchme = require("../../../models/bikeSchema")
const cloudinary = require("../../../utils/cloudinary")
const upload = require("../../../utils/multer")
const path = require('path')
const fs = require('fs')


exports.addBike = async (req, res) => {
    console.log("bike details", req.body);

    try {
        const uploader = async (path) => await cloudinary.uploads(path, 'Images')

        if (req.method === 'POST') {
            const urls = []
            const files = req.files

            for (const file of files) {
                const { path } = file

                const newPath = await uploader(path)
                urls.push(newPath)
                fs.unlinkSync(path)
            }

            console.log("Urls",urls);

            let photo = []

            for (let i = 0; i < urls.length; i++) {
                photo.push(urls[i].url)
                
            }
            // res.status(200).json({
            //     message: "Image Upload Success",
            //     data: urls
            // })

            let bikeDetails = {
                ownerName : req.body.ownerName,
                bikeName : req.body.bikeName,
                bikeModel : req.body.bikeModel,
                engineNumber : req.body.engineNumber,
                brand : req.body.brand,
                color : req.body.color,
                fuel : req.body.fuel ,
                description : req.body.description,
                price : req.body.price,
                photo
            }
            console.log(bikeDetails,'hfhfhfffh');

            bikeSchme.create(bikeDetails).then((data)=>{
                console.log('bike data',data);
                res.status(200).json(data)
            })


        }else{
            // res.status(405).json({
            //     error : `${req.method} method is not allowed`
            // })
        }
    } catch (error) {

    }
}