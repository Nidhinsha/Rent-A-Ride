const userSchema = require("../../../models/userSchema")

exports.userContactController = async(req,res)=>{
    try {
            const contacts = await userSchema.find({
                _id : {$ne :req.query.id }
            })
            .select([
                "email",
                "firstName",
                "lastName",
                "status",
                "photo"
            ])
            return res.status(200).json(contacts)
            
    } catch (error) {
        res.status(400).json("error while finding contacts")
    }
}