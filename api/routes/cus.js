const express = require('express');
const router = express.Router();
const {User} = require('../model/cus');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');


////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/register', (req,res) =>{

    //To register cus

    const {cusUn , cusEmail, cusPw} = req.body;
    if(!cusUn || !cusEmail || !cusPw){
        return res.status(400).json({msg:'Please Fill All Fields'});
    }

    User.findOne({cusUn}).then(user => {
        if(user){
            return res.status(400).json({msg : 'Username Already Exist'})
        }
    });

    User.findOne({cusEmail}).then(user => {
        if(user){
            return res.status(400).json({msg : 'Email Already Exist'})
        }
    });


    const user = new User(req.body);

    bcrypt.genSalt(10, (err, salt) => {

        bcrypt.hash(user.cusPw, saltRounds, function(error, hash) {
            if (error) {
                throw err;
            }
            user.cusPw = hash;

            user.save().then(user  => {

                jwt.sign(
                    {_id : user._id}, "secret", {expiresIn: 10},
                    (error, token) =>{
                        if(error) {
                            throw error;
                        }
                        res.json({
                            token,
                            user: {
                                _id: user._id,
                                cusUn: user.cusUn,
                                cusEmail: user.cusEmail
                            }
                        });
                    }
                );
            });

        });

    });



});

////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/login', (req,res) =>{

    //To login cus

    const {cusUn , cusPw} = req.body;
    if(!cusUn || !cusPw){
        return res.status(400).json({msg:'Please Fill All Fields'});
    }

    User.findOne({cusUn}).then(user => {
        if(!user){
            return res.status(400).json({msg : 'Invalid Username'})
        }

        bcrypt.compare(cusPw, user.cusPw).then(result => {
            if(!result){
                return res.status(400).json({
                    msg:'Invalid Credentials'
                });

            }

            jwt.sign(
                {_id : user._id}, "secret", {expiresIn: 3500},
                (error, token) =>{
                    if(error) {
                        throw error;
                    }
                    res.json({
                        token,
                        user: {
                            _id: user._id,
                            cusUn: user.cusUn,
                            cusEmail: user.cusEmail
                        }
                    });
                }
            );
        });


    });


});

/////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/get/cus', auth, (req, res) => {
    User.findById(req.user._id).select('-cusPw').then(user => res.json(user));
});

module.exports = router;