const locationSchema = require("../../models/locationSchema")

exports.addLocation = async(req,res)=>{
    try {
        console.log(req.body,'req body of add location');

        locationSchema.create(req.body).then((data)=>{
            console.log('loc created',data);
            res.status(200).json(data)
        })
    } catch (error) {
        res.status(400).json(error)
    }
}