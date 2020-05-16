const  express = require('express');
const storemanagerRoutes = express.Router();

let StoreManager = require('../model/storemanager.model');

//store
storemanagerRoutes.route('/add').post(function(req, res){
    let storemanager = new StoreManager(req.body);
    storemanager.save()
        .then(storemanager => {
            // res.status(200).json({'product': 'product is added successfully'});
            res.status(200).json({success: true});
        })
        .catch(err => {
            // res.status(400).send("unable to save product to database");
            res.status(400).json({success: false},err);
        });
});

module.exports = storemanagerRoutes;
