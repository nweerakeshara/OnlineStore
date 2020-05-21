//wish list routes
const express = require("express");
const wishListRoute = express.Router();

let WishList = require("../model/wishlist");

//add items to the wishlist
wishListRoute.route("/add").post(function (req, res) {
  let wishList = new WishList(req.body);
  wishList
    .save()
    .then((data) => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.json({ success: false });
    });
});

//get items from wishlist
wishListRoute.route("/get").get(function (req, res) {
  WishList.find(function (err, product) {
    if (err) console.log(err);
    else {
      res.json(product);
    }
  });
});

//delete an item from the wishlist
wishListRoute.route("/delete/:id").delete(function (req, res) {
  WishList.remove({ product_id: req.params.id }, function (err, product) {
    if (err) res.json(err);
    else res.json("Successfully Removed");
  });
});

module.exports = wishListRoute;
