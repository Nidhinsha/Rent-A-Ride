const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    location:{
        type : String,
        // required : true
    }
})

const model = mongoose.model('location',locationSchema)

module.exports = model