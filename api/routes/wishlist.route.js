const  express = require('express');
const wishListRoute = express.Router();

let WishList = require('../model/wishlist');

//store
wishListRoute.route('/add').post(function(req, res){
    let wishList = new WishList(req.body);
    wishList.save()
        .then(() => res.json({success:true}))
        .catch(err => res.json({success:false}));
        
})

//get data
wishListRoute.route('/get').get(function(req,res){
    WishList.find(function(err, product){
        if(err)
            console.log(err);
        else{
            res.json(product);
        }
    });
});

wishListRoute.route('/get/:id').get(function(req,res){
            WishList.findOne({
                product_id : req.params.id
            }).then(wishlist => {
                res.json(wishlist);
            })
});

wishListRoute.route('/delete/:id').delete(function(req,res){
   WishList.remove({product_id:req.params.id},function(err,product){
       if(err)res.json(err);
       else res.json('Successfully Removed');
   })
});

// //edit
// productRoutes.route('/edit/:id').get(function(req, res){
//     let id = req.params.id;
//     Product.findById(id, function(err, product){
//         res.json(product);
//     });
// });

// //update
// productRoutes.route('/update/:id').post(function(req, res){
//     Product.findById(req.params.id, function(err, product){
//         if(!product)
//             res.status(404).send('data is not found');
//         else{
//             product.product_id = req.body.product_id;
//             product.product_name = req.body.product_name;
//             product.product_price = req.body.product_price;
//             product.product_discount = req.body.product_discount;
//             product.product_category = req.body.product_category;

//             product.save().then(product => {
//                 res.json("Update complete");
//             })
//                 .catch(err => {
//                     res.status(400).send("unable to update database");
//                 });
//         }
//     });
// });

module.exports = wishListRoute;
