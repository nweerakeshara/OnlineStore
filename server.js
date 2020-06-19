const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const keyConfig = require("./api/config/key");
const cors = require("cors");
const path = require("path");

mongoose
  .connect(keyConfig.mongoDBURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log(error));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use("/api/cus", require("./api/routes/cus"));
app.use("/api/items", require("./api/routes/shoppingItems"));
app.use("/api/product", require("./api/routes/product.route"));
app.use('/api/productcategory', require('./api/routes/productCategory.route'));
app.use("/api/storemanager", require("./api/routes/storemanager.route"));
app.use("/api/order", require("./api/routes/OrderRoute"));
app.use("/api/wishlist", require("./api/routes/wishlist.route"));
app.use("/api/rating", require("./api/routes/RatingsRoute"));
app.use("/api/comments", require("./api/routes/comments"));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.get("/", (req, res) => {
  res.send("Running ");
  //default
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running on Port - ${port}`);
});
