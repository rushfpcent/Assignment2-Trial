const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name:{
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
    },
    created:{
        type:Date,
        default:Date.now
    },
    updated:{
        type:Date,
        default:Date.now
    },
    hashed_passwords:{
        type:String,
        required:'Password is required',
    },
    salt:String
}, {timestamps:true})

UserSchema.virtual('password')
.set(function(password){
    this._password = password;
    this.salt = bcrypt.genSaltSync(10);
    this.hashed_passwords = bcrypt.hashSync(password, this.salt); 
})
.get(function(){
    return this._password;
});

UserSchema.path('hashed_passwords').validate(function(v){
    if(this._password && this._password.length < 8) {
        this.invalidate('password', 'Password should be > 8 characters')
    }
    if(this.isNew && !this._password) {
        this.$invalidate('password', 'Password is required')
    }
}, null);
module.exports = mongoose.model('User', UserSchema)