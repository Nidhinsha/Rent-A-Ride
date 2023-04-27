const locationSchema = require("../../models/locationSchema")

exports.addLocation = async(req,res)=>{
    try {

        locationSchema.create(req.body).then(()=>{
            locationSchema.find().then((data)=>{
                res.status(201).json(data)
            })
        })
    } catch (error) {
        res.status(400).json({message:"error in adding location"})
    }
}

exports.getLocation = async(req,res)=>{
    try {
        locationSchema.find().then((data)=>{
            res.status(200).json(data)
        })
    } catch (error) {
        res.status(400).json({message : "cloudn't fetch the location"})
    }
}

exports.editLocation = async(req,res)=>{
    try {
        const updateLocation = await  locationSchema.updateOne(
                {
                    _id : req.query.id
                },
                {
                    $set : {
                        location : req.body.location
                    }
                }
            )
           
           const data = await locationSchema.find()
           
           res.status(200).json(data)
            
    } catch (error) {
        res.status(400).json({message : "error while updating"})
    }
}

exports.deleteLocation = async(req,res)=>{
    try {
        locationSchema.deleteOne({_id : req.query.id}).then(() => {
            locationSchema.find().then((data) => {
                res.status(200).json(data)
            })
        })

    } catch (error) {
        res.status(400).json({message : "error while deleting.."})
    }
}