const adminSchema = require("../../models/adminSchema")
const userSchema = require("../../models/userSchema")

exports.adminUser = async (req,res) => {
    userSchema.find().then((data)=>{
        console.log(data,'bnbnbnbn');
        res.status(200).json(data)
    })
}

exports.blockUser = async(req,res)=>{
    console.log(req.query.id,'user id for block');
    try {
        
        const user = await userSchema.findById(req.query.id);
        const currentStatus = user.status;
        const newStatus = !currentStatus;

        await userSchema.updateOne(
            {
                _id : req.query.id
            },
            {
                $set : {
                    status : newStatus 
                }
            }
        )

            let data = await userSchema.find()
            res.status(201).json(data)
        
    } catch (error) {
        console.log("block error");
        res.status(400).json({ message: "Error Occured !", error: error.message })
    }
}


