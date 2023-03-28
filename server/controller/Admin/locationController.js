const locationSchema = require("../../models/locationSchema")

exports.addLocation = async(req,res)=>{
    try {
        console.log(req.body,'req body of add location');

        locationSchema.create(req.body).then((data)=>{
            console.log('loc created',data);
            res.status(201).json(data)
        })
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.getLocation = async(req,res)=>{
    try {
        locationSchema.find().then((data)=>{
            console.log(data,'full loc');

            res.status(200).json(data)
        })
    } catch (error) {
        res.status(400).json({message : "cloudn't fetch the location"})
    }
}

exports.editLocation = async(req,res)=>{
    try {
        console.log(req.query.location,'loc for checkinf');
        console.log(req.body.location,'jkjkjkjkjkj');

        const findLocation = await  locationSchema.findOne({location : req.query.location})
        console.log(findLocation,'findloac');
        await  locationSchema.updateOne(
                {
                    location : req.query.location
                },
                {
                    $set : {
                        location : req.body.location
                    }
                }
            )
           
           const data = await locationSchema.find()
           
           res.status(400).json(data)
            
    } catch (error) {
        res.status(400).json({message : "error while updating"})
    }
}