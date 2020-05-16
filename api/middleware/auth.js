const {User} = require('../model/cus');

let auth = (req, res, next) =>{
    
    let token = req.cookies.sc_emp_auth;

    User.findByToken(token, (error,user) => {
        if (error){
            throw error;
        }
        if(!user){
            return res.json({
                isAuth: false,
                error:true
            });
        }

        req.token = token;
        req.user = user;
        next();
    });

}
module.exports ={auth};