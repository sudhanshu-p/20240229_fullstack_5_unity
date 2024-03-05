// External dependencies
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

// Importing Internal Routers
const authRouter = require("./router/authRouter");
const userRouter = require("./router/userRouter");
const orderRouter = require("./router/orderRouter");
const productRouter = require("./router/productRouter");
const sellerRouter = require("./router/sellerRouter");

// Setting up the app
const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

// Routes
// Authentication Router
app.use("/auth", authRouter);

// User Router
// app.use("/user", userRouter);

// Order Router
// app.use("/order", orderRouter);

// Product Router
// app.use("/product", productRouter);

// Seller Router
// app.use("/seller", sellerRouter);

app.listen(PORT, () => console.log("Server live"));
