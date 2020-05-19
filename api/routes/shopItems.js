const paginate = require('jw-paginate');

const express = require('express');
const router = express.Router();


const shoppingItem = require('../model/product.model');

router.get('/get/all/paginate', (req,res) => {
    shoppingItem.find().then(items => res.json(items));




});






module.exports = router;