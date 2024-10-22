const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    firstname:{
        type:String,
        trim:true,
        required:"Name is required"
    },
    lastname:{
        type:String,
        trim:true,
        required:"Name is required"
    },
    email:{
        type:String,
        trim:true,
        unique:"Email already exists",
        match:[/^\S+@\S+\.\S+$/,'Please enter valid email'],
        required:"Email is required",
    }
})

module.exports = mongoose.model('Contact', ContactSchema)