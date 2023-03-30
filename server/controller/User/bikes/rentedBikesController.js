const bikeSchema = require("../../../models/bikeSchema")

exports.userAllBikeController = async (req, res) => {
    console.log('id of user', req.query.ownerName);
    try {
        bikeSchema.find({ ownerName: req.query.ownerName }).then((data) => {
            res.status(200).json(data)
        })
    } catch (error) {
        res.status(400).json({ message: "error finding bikes" })
    }
}

exports.userGetAcceptedBikes = async (req, res) => {
    try {
        bikeSchema.find({
            
                ownerName: req.query.ownerName ,
                status: "accepted" 
          
        }
        ).then((data)=>{
            res.status(200).json(data)
        })
        .catch((error)=>{
            res.status(404).json({ message: "Accepted bikes not found" });
        })
    } catch (error) {
        res.status(400).json({message : "error finding accepted bikes"})
    }
}

exports.userGetRejectedBikes = async (req, res) => {
    try {
        bikeSchema.find({
            
                ownerName: req.query.ownerName ,
                status: "rejected" 
          
        }
        ).then((data)=>{
            res.status(200).json(data)
        })
        .catch((error)=>{
            res.status(404).json({ message: "Accepted bikes not found" });
        })
    } catch (error) {
        res.status(400).json({message : "error finding accepted bikes"})
    }
}
exports.userGetPendingBikes = async (req, res) => {
    try {
        bikeSchema.find({
            
                ownerName: req.query.ownerName ,
                status: "pending" 
          
        }
        ).then((data)=>{
            res.status(200).json(data)
        })
        .catch((error)=>{
            res.status(404).json({ message: "Accepted bikes not found" });
        })
    } catch (error) {
        res.status(400).json({message : "error finding accepted bikes"})
    }
}