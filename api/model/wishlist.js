///wish list database schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Wishlist = new Schema({
    product_id : {
        type : String,
        unique : true
    },
    product_name : {
        type : String
    },
    product_price : {
        type : Number
    }
},{
    collection : 'wishlist'
});

module.exports = mongoose.model('wishlist', Wishlist);