const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const connectDb = require("./connection/dbConnection");
connectDb();
const auth = require("./router/auth");
const user = require("./router/user");
const cart = require("./router/cart");
const order = require("./router/order");
const Product = require("./router/product");
const product = require("./router/product");
app.use(express.static("public")); //*TO TELL EXPRESS THAT WE ARE GONNA USE HTML IN OUR PROJECT
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;
app.use("/auth", auth);
app.use("/user", user);
app.use("/cart", cart);
app.use("/order", order);
app.use("/product", product);

app.get("/", (req, res) => {
  res.send("hello");
}); //*YOU ALWAYS MENTION THE SUB FILES ONLY WITHOUT THE EXTENSION
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
