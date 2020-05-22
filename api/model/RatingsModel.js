const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Rating = new Schema(
  {
    user_id: {
      type: Number,
    },
    product_id: {
      type: Number,
    },
    value: {
      type: Number,
    },
  },
  {
    collection: "ratings",
  }
);

module.exports = mongoose.model("Rating", Rating);
