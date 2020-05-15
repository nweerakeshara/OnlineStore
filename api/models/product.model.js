const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = new Schema({
    product_id : {
        type : String
    },
    product_name : {
        type : String
    },
    product_price : {
        type : Number
    },
    product_discount : {
        type : Number
    },
    product_category: {
        type: String,
        default: 'No category'
    }
},{
    collection : 'product'
});

module.exports = mongoose.model('Product', Product);
