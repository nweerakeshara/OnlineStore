const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


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

    role : {
        type:Number,
        default:0
    },

    token : {
        type: String
    },


})



userSchema.pre('save', function(next){
    var user = this;
    bcrypt.hash(user.cusPw, saltRounds, function(error, hash) {
        if(error){
            return next(error);
        }
        user.cusPw = hash;
        next();
    });
});



userSchema.methods.comparePassword = function (plainPassword, call_back) {

    bcrypt.compare(plainPassword, this.cusPw, function(error, result) {

        if(error){
            return call_back(error);

        }
        call_back(null,result);

    });
}




userSchema.methods.generateToken = function (plainPassword, call_back){
    var user = this;
    var token = jwt.sign(user._id.toHexString(),'secret');
    user.token = token;
    user.cusPw = plainPassword;
    user.save(function (error, user) {
        if(error){
            return call_back(error);

        }
        call_back(null,user);

    })

}




userSchema.statics.findByToken = function (token, call_back) {
    var user = this;
    jwt.verify(token, 'secret', function (error,decode) {
        user.findOne({"_id": decode, "token" : token}, function (error, user) {
            if(error){
                return call_back(error);

            }
            call_back(null,user);
        });
    });
}




const User = mongoose.model('Customers', userSchema);
module.exports = {User};