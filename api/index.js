const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const keyConfig = require('./config/key');
const cors = require('cors');

mongoose.connect( keyConfig.mongoDBURI,
    {useUnifiedTopology: true, useNewUrlParser: true}).then(() => console.log("DB Connected")).catch(error => console.log(error));
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/cus', require('./routes/cus'));
app.use('/api/items', require('./routes/shoppingItems'));
app.use('/api/storemanager', require('./routes/storemanager.route'));
app.use('/api/product', require('./routes/product.route'));
app.use('/api/wishlist',require('./routes/wishlist.route'));


app.get('/', (req,res) =>{
    res.send("Running on port 5000")
    //default
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server Running on Port - ${port}`);
});
