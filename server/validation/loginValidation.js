const Joi = require("joi")
const passwordComplexity = require("joi-password-complexity")

// signUp

const validateSignup = (data) =>{
    console.log(data,'data for signup');

    const Schema = Joi.object({
        fullName: Joi.string().required().label("FullName"),
        email : Joi.string().email().required().label("Email"),
        phone: Joi.string().required().label("Phone"),
        password : passwordComplexity().required().label("Password")
    })
    return Schema.validate(data)
}

module.exports = { validateSignup }