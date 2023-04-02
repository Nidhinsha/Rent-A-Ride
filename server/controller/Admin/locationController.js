const locationSchema = require("../../models/locationSchema")

exports.addLocation = async(req,res)=>{
    try {
        console.log(req.body,'req body of add location');

        locationSchema.create(req.body).then(()=>{
            locationSchema.find().then((data)=>{
                console.log('loc created',data);
                res.status(201).json(data)
            })
        })
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.getLocation = async(req,res)=>{
    try {
        locationSchema.find().then((data)=>{
            console.log(data,'full loc form the backend');

            res.status(200).json(data)
        })
    } catch (error) {
        res.status(400).json({message : "cloudn't fetch the location"})
    }
}

exports.editLocation = async(req,res)=>{
    try {
        console.log(req.query.id,'loc for id');
        console.log(req.body.location,'body location');

        const findLocation = await  locationSchema.findOne({_id : req.query.id})
        console.log(findLocation,'findloac');
        await  locationSchema.updateOne(
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
        console.log('delete query',req.query.id);
        locationSchema.deleteOne({_id : req.query.id}).then((data) => {
            console.log("deleed",data);
            locationSchema.find().then((data) => {
                console.log("after deletinf",data);
                res.status(200).json(data)
            })
        })

    } catch (error) {
        res.status(400).json({message : "error while deleting.."})
    }
}