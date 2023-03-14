const adminSchema = require("../../models/adminSchema")
const userSchema = require("../../models/userSchema")

exports.adminUser = async (req,res) => {
    userSchema.findOne().then((data)=>{
        console.log(data,'bnbnbnbn');
        res.status(200).json(data)
    })
}


