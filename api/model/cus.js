const mongoose = require('mongoose');

const moment = require('moment');


const userSchema = mongoose.Schema({

    cusUn: {
        type: String,
        maxlength:50,
        unique: 1
    },

    cusEmail: {
        type:String,
        trim: true,
        unique: 1
    },

    cusPw: {
        type:String,
        minlength:5
    },

    date : {
        type:Date,
        default:Date.now()
    },

    token : {
        type: String
    },


})





const User = mongoose.model('Customers', userSchema);
module.exports = {User};