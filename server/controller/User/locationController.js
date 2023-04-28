const locationScchema = require('../../models/locationSchema')

exports.getLocations = (req,res) => {
    try {
        locationScchema.find().then((data) => {
            res.status(200).json(data)
        })
    } catch (error) {
        res.status(400).json({message:"not found"})
    }
}