const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    position : String,
    company : String,
    status : {
        type : String,
        enums : ['pending', 'interview', 'declined'],
        default : 'pending'
    },
    createdBy : {
        type : mongoose.Types.ObjectId,
        ref : 'auth',
        required : [true, 'Please provide user']
    }
    
}, {timestamps : true})

module.exports = mongoose.model('jobs', jobSchema)