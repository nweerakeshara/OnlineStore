const  express = require('express');
const productRoutes = express.Router();

let Product = require('../models/product.model');

//store
productRoutes.route('/add').post(function(req, res){
    let product = new Product(req.body);
    product.save()
        .then(product => {
            // res.status(200).json({'product': 'product is added successfully'});
            res.status(200).json({success: true});
        })
        .catch(err => {
            // res.status(400).send("unable to save product to database");
            res.status(400).json({success: false},err);
        });
});

//get data
productRoutes.route('/').get(function(req,res){
    Product.find(function(err, product){
        if(err)
            console.log(err);
        else{
            res.json(product);
        }
    });
});

//edit
productRoutes.route('/edit/:id').get(function(req, res){
    let id = req.params.id;
    Product.findById(id, function(err, product){
        res.json(product);
    });
});

//update
productRoutes.route('/update/:id').post(function(req, res){
    Product.findById(req.params.id, function(err, product){
        if(!product)
            res.status(404).send('data is not found');
        else{
            product.product_id = req.body.product_id;
            product.product_name = req.body.product_name;
            product.product_price = req.body.product_price;
            product.product_discount = req.body.product_discount;
            product.product_category = req.body.product_category;

            product.save().then(product => {
                res.json("Update complete");
            })
                .catch(err => {
                    res.status(400).send("unable to update database");
                });
        }
    });
});

module.exports = productRoutes;
