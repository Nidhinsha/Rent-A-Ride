const locationScchema = require('../../models/locationSchema')

exports.getLocations = (req,res) => {
    try {
        locationScchema.find().then((data) => {
            console.log('loc data in the user contr');
            res.status(200).json(data)
        })
    } catch (error) {
        res.status(400).json("not found")
    }
}