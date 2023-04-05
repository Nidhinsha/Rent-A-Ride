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
                        // isGoogle,
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
                            id : userData.id ,
                            firstName : userData.firstName ,
                            lastName : userData.lastName ,
                            email : userData.email ,
                            phone : userData.phone , 
                            photo : userData.photo,
                            proof : userData.proof,
                            token : generateToken(userData.id)
                        }
                        console.log('details in login',details);
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

// google signup 

exports.googleSingup = async(req,res)=>{
    console.log(req.body,'body');

    userSchema.findOne(
        {
            email : req.body.email
        }
    ).then((existingUser)=>{
        if (existingUser) {
            if(existingUser.status){

                const userDetails ={
                    id : existingUser.id,
                    firstName : existingUser.firstName,
                    lastName : existingUser.lastName,
                    email : existingUser.email,
                    phone : existingUser.phone,
                    proof : existingUser.proof,
                    token : generateToken(existingUser.id),
                    isGoogle : true
                }

                res.status(200).json(userDetails)
                console.log('already existing user login');
            }else{
                res.status(401).json("Account is Suspended")
            }
        } else {
            console.log('req.body in the crea user side',req.body);
            
            const userDetails ={
                firstName :req.body.firstName,
                lastName : req.body.lastName,
                email : req.body.email,
                phone : req.body.phone, 
                photo : req.body.photo,
                isGoogle : true
            }
            userSchema.create(userDetails).then((data)=>{
                const details ={
                    firstName : data.firstName,
                    lastName : data.lastName,
                    email : data.email,
                    phone : data.phone,
                    photo : data.photo,
                    token : generateToken(data.id),
                    isGoogle : true
                }
                res.status(201).json(details)
                console.log('the user created',data);
            })
            .catch((error)=>{
                console.log('error in google with signup create',error);
                res.status(400).json("error while creating user with google !!!")
            })
        }
    })
}

exports.otpLoginController = (req,res)=>{
    try {
        console.log(req.body,'bodyyyyyy');
        userSchema.findOne({phone : req.body.phone}).then((data)=>{
            if(data){
                console.log(data,'data for send to the frontend');
                if(data.status){
                    const {id,firstName,lastName,email,status,phone,photo,proof} = data

                    const result ={
                        id,
                        firstName,
                        lastName,
                        email,
                        phone,
                        photo,
                        status,
                        proof,
                        token : generateToken(id)
                    }
                    console.log(result,'result otp');

                    res.status(200).json(result)
                }else{
                    res.json(400).json("Account suspended Temporarily")
                }
            }else{
                res.status(400).json("phone number not registred")
            }
        })
        .catch((error)=>{
            res.json(error)
        })
    } catch (error) {
        
    }
}

