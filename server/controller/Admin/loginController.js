const adminSchema = require('../../models/adminSchema')
const userSchema = require('../../models/userSchema')
const bcrypt = require('bcrypt')
const generateToken = require('../../Middlewares/generateToken')

exports.adminLogin = async (req, res) => {
    console.log(req.body,'ddddddd');
    adminSchema.findOne({ email: req.body.email }).then((data) => {
        console.log(data,'admin data');
        if (data) {
            bcrypt.compare(req.body.password, data.password, function (err, response) {
                console.log(response);


                if (response) {
                    const details = {
                        email: data.email,
                        token: generateToken(data._id)
                    }
                    res.status(200).json(details)
                } else {
                    res.status(401).json("Invalid Password")
                }
            })
        }else{
            res.status(401).json("Admin Not Valid")
        }
    })
}

