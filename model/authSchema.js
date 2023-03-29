const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authSchema = new mongoose.Schema({
    username : String,
    lastname : String,
    password : String,
    email : {
        type : String,
        required : [true, "please provide email"],
        unique : true
    },
    location : String
})

// hashing password
authSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// creating JWT
authSchema.methods.createJWT = function(){
    return jwt.sign(
        { userID : this._id, name : this.username}, 
        process.env.JWT_SECRET, 
        {expiresIn : process.env.JWT_LIFETIME}
    )}

// compare password
authSchema.methods.comparePasswords = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('auth', authSchema)