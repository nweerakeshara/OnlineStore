const express = require("express");
const ratingRoutes = express.Router();

let Rating = require("../model/RatingsModel");

//add rating
ratingRoutes.route("/add").post(function (req, res) {
  let rating = new Rating(req.body);
  console.log(rating.user_id);
  Rating.findOneAndUpdate(
    { user_id: rating.user_id },
    {
      user_id: rating.user_id,
      product_id: rating.product_id,
      value: rating.value,
    },
    { upsert: true },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("Succesfully saved.");
    }
  );
});

//get rating
ratingRoutes.route("/get").get(function (req, res) {
  Rating.find(function (err, ratings) {
    if (err) console.log(err);
    else {
      res.json(ratings);
    }
  });
});

module.exports = ratingRoutes;
