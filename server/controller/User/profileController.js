const userSchema = require("../../models/userSchema")

exports.profileGet = async (req,res)=>{
    try {
        console.log(req.query.id,'profile query');
        userSchema.findOne({_id : req.query.id}).then((data)=>{
            res.json(data)
            console.log(data,'user data profile');
        })
    } catch (error) {
        console.log(error,'user profile feching eror');
    }
}

exports.addProfilePic = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}