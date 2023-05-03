const userSchema = require('../../models/userSchema')
const walletSchema = require("../../models/walletSchema")
const bcrypt = require("bcrypt")
const generateToken = require('../../Middlewares/generateToken')

// Sign UP
exports.SignUpPost = async (req, res) => {
    try {
        let {
            firstName,
            lastName,
            email,
            phone,
            password
        } = req.body



        // finding if the user is alredy exist or not with email or phone number
        const userEmail = await userSchema.findOne({ email: email })
        const userPhoneNumber = await userSchema.findOne({ phone: phone })

        const details = {
            firstName,
            lastName,
            email,
            phone,
            password
        }

        if (userEmail && userPhoneNumber) {
            res.status(400).json({ message: "Email and phone already exist" })
        } else if (userEmail && !userPhoneNumber) {
            res.status(400).json({ message: "Email already exist" })
        } else if (!userEmail && userPhoneNumber) {
            res.status(400).json({ message: "Phone Number already exist" })
        } else {
            // changing the password to a encrypted one 
            details.password = await bcrypt.hash(details.password, 10)


            userSchema.create(details).then((userData) => {
                let data = {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    token: generateToken(userData.id),

                }

                // referal setting
                if (req.body.referalCode !== '') {
                    userSchema.findOne(
                        {
                            referalCode: req.body.referalCode
                        }
                    )
                        .then(async (user) => {
                            let walletExists = await walletSchema.findOne(
                                {
                                    userId: user._id
                                }
                            )

                            if (!walletExists) {
                                const newWallet = {
                                    userId: user._id,
                                    walletAmount: 100,
                                    walletHistory: [
                                        {
                                            transactionType: "referal bonus",
                                            amountAdded: 100
                                        }
                                    ]
                                }

                                walletSchema.create(newWallet)
                            } else {
                                walletSchema.updateOne(
                                    {
                                        userId: walletExists.userId
                                    },
                                    {
                                        $inc: {
                                            walletAmount: 100
                                        },
                                        $push: {
                                            walletHistory: {
                                                transactionType: "referal bonus",
                                                amountAdded: 100
                                            }
                                        }
                                    }
                                )

                            }
                        })
                        .catch((error) => {
                           res.status({message:"error in referal setting"})
                        })

                    const newUserWallet = {
                        userId: userData._id,
                        walletAmount: 50,
                        walletHistory: [
                            {
                                transactionType: "referal share",
                                amountAdded: 50
                            }
                        ]
                    }
                    walletSchema.create(newUserWallet)
                }
                res.status(201).json(data)
                console.log(userData);
            }).catch((err) => {
                res.status(400).json({ message: "error in creating User" })
            })
        }
    } catch (error) {
        res.json(error.message)
    }
}

// Login 

exports.LoginPost = async (req, res) => {

    try {
        userSchema.findOne({ email: req.body.email }).then((userData) => {
            if (userData) {
                // here i need to check whether the user is bloked or not 
                if (userData.status) {
                    bcrypt.compare(req.body.password, userData.password, function (err, response) {
                        if (response) {
                            let details = {
                                id: userData.id,
                                firstName: userData.firstName,
                                lastName: userData.lastName,
                                email: userData.email,
                                phone: userData.phone,
                                photo: userData.photo,
                                proof: userData.proof,
                                token: generateToken(userData.id)
                            }
                            res.status(200).json(details)
                        } else {
                            res.status(401).json({ message: "Incorrect Password" })
                        }
                    })
                } else {
                    res.status(401).json({ message: "Account is Suspended" })
                }

            } else {
                res.status(400).json({ message: "User Does Not Exits" })
            }
        }).
        catch((error) => {
            res.json("Error")
            })
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

// google signup 

exports.googleSingup = async (req, res) => {

    userSchema.findOne(
        {
            email: req.body.email
        }
    ).then((existingUser) => {
        if (existingUser) {
            if (existingUser.status) {

                const userDetails = {
                    id: existingUser.id,
                    firstName: existingUser.firstName,
                    lastName: existingUser.lastName,
                    email: existingUser.email,
                    phone: existingUser.phone,
                    proof: existingUser.proof,
                    token: generateToken(existingUser.id),
                    isGoogle: true
                }

                res.status(200).json(userDetails)
            } else {
                res.status(401).json({ message: "Account is Suspended" })
            }
        } else {

            const userDetails = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                photo: req.body.photo,
                isGoogle: true
            }
            userSchema.create(userDetails).then((data) => {
                const details = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    photo: data.photo,
                    token: generateToken(data.id),
                    isGoogle: true
                }
                res.status(201).json(details)
            })
                .catch((error) => {
                    res.status(400).json({ message: "error in creating user" })
                })
        }
    })
}

exports.otpLoginController = (req, res) => {
    try {

        userSchema.findOne({ phone: req.body.phone }).then((data) => {
            if (data) {

                if (data.status) {
                    const { id, firstName, lastName, email, status, phone, photo, proof } = data

                    const result = {
                        id,
                        firstName,
                        lastName,
                        email,
                        phone,
                        photo,
                        status,
                        proof,
                        token: generateToken(id)
                    }

                    res.status(200).json(result)
                } else {
                    res.json(400).json({ message: "Account suspended Temporarily" })
                }
            } else {
                res.status(400).json({ message: "phone number not registred" })
            }
        })
            .catch((error) => {
                res.json(error)
            })
    } catch (error) {
        res.status(500).json({ message: "internal server error" })
    }
}

