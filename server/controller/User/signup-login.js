const userSchema = require('../../models/userSchema')
const bcrypt = require("bcrypt")
const generateToken = require('../../Middlewares/generateToken')

// Sign UP
exports.SignUpPost = async(req,res)=>{
    console.log(req.body);
    try {
        let details = {
            firstName,
            lastName,
            email,
            phone,
            password
        } = req.body

        // changing the password to a encrypted one 
        details.password = await bcrypt.hash(req.body.password,10)

        // finding if the user is alredy exist or not 
        userSchema.findOne({email : details.email}).then((userData)=>{
            if (userData) {
                res.status(400).json("User Already Exists")
                console.log('user already exists');
            }else{
                userSchema.create(details).then((userData)=>{
                    let details = {
                        firstName : userData.firstName ,
                        lastName : userData.lastName , 
                        email : userData.email ,
                        // picture: userData.picture,
                        token : generateToken(userData.id)
                    }
                    res.status(201).json(details)
                    console.log(userData);
                    // throw new Error("Error occured ! ")
                }).catch((err)=>{
                    res.status(400)
                    console.log('err',err);
                })
            }
        })
    } catch (error) {
        res.json(error.message)
    }
}

// Login 

exports.LoginPost= async(req,res)=>{
    console.log(req.body,'login body');

    try {
        userSchema.findOne({email: req.body.email}).then((userData)=>{
            if (userData) {
                // here i need to check whether the user is bloked or not 
                if(userData.status){
                    bcrypt.compare(req.body.password , userData.password , function (err,response){
                        if (response) {
                            let details ={
                            _id : userData._id ,
                            firstName : userData.firstName ,
                            lastName : userData.lastName ,
                            email : userData.email ,
                            phone : userData.phone , 
                            token : generateToken(userData.id)
                        }
                        console.log('details',details);
                        res.status(200).json(details)
                        }else{
                            res.status(401).json("Incorrect Password")
                            console.log("password incorrect !");
                        }
                    })
                }else{
                    res.status(401).json("Account is Suspended")
                }
                
            }else{
                res.status(400).json("User Does Not Exits")
                console.log(" No User ");
            }
        }).
        catch((error)=>{
            rs.json("Error")
        })
    } catch (error) {
        
    }
}

