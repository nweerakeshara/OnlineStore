const paginate = require('jw-paginate');

const express = require('express');
const router = express.Router();


const shoppingItem = require('../model/product.model');

router.get('/get/all/paginate', (req,res) => {
    shoppingItem.find().then(items => {

        const page = parseInt(req.query.page) || 1;

        // get pager object for specified page
        const pageSize = 5;
        const pager = paginate(items.length, page, pageSize);

        // get page of items from items array
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // return pager object and current page of items
        return res.json({ pager, pageOfItems });

    });




});






module.exports = router;