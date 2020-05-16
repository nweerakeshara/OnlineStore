const express = require('express');
const router = express.Router();
const {User} = require('../model/cus');
const {auth} = require('../middleware/auth');




router.get('/auth', auth, (req,res) =>{
    //To ensure authentication
    res.status(200).json({
        _id : req.user._id,
        isAuth : true,
        empUn: req.user.cusUn,
        empEmail: req.user.cusEmail,
        role: req.user.role

    });

});




router.post('/register', (req,res) =>{
    const emp = new User(req.body);
    emp.save((error, userData) =>{
        if(error) {
            return res.json({success: false, error});
        }
        return res.status(200).json({ success: true   });
    });
    //To register emp
});



router.post('/api/cus/login', (req,res) =>{
    //To verify the employee when login
    User.findOne({cusUn: req.body.cusUn}, (error, user)=> {
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "Auth Failed, Username incorrect"
            });

        }
        user.comparePassword(req.body.cusPw, (error, result) =>{

            if(!result){
                return res.json({
                    loginSuccess: false,
                    message: "Auth Failed, Password incorrect"
                });
            }

            user.generateToken (req.body.cusPw,(error, user) =>{

                if(error){
                    return res.status(400).send(error);
                }
                res.cookie("sc_emp_auth", user.token).status(200).json({
                    loginSuccess: true,
                    userId: user._id
                })

            });

        });



    });

});


router.get('/api/cus/logout', auth, (req,res) =>{

    User.findOneAndUpdate({_id: req.user._id}, {token:""}, (error, doc) =>{
        if(error){
            return res.json({success: false, error});
        }
        return res.status(200).send({
            success: true
        });
    });

});

module.exports = router;