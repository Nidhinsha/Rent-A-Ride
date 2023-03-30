const bikeSchema = require("../../../models/bikeSchema")

exports.searchBikes = (req,res)=>{
    bikeSchema.find(
        {
            $and:[
                {
                    bikeName:
                        {
                            $regex : req.body.searchTerm,$options : 'i'
                        }
                },
                {
                    status : 'accepted'
                }
            ]
        }
    ).then((data)=>{
        res.status(200).json(data)
    })
    .catch((error)=>{
        res.status(400).json({message : "error in the search"})
    })
}