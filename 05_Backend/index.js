// External dependencies
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

// Database connection
const { connectToDatabase } = require("./database/db");
// Importing Internal Routers
const authRouter = require("./router/authRouter");
const userRouter = require("./router/userRouter");
const orderRouter = require("./router/orderRouter");
const productRouter = require("./router/productRouter");
const sellerRouter = require("./router/sellerRouter");

// Setting up the app
const app = express();
app.use(bodyParser.json());

// Routes
// Authentication Router
app.use("/auth", authRouter);

// User Router
// app.use("/user", userRouter);

// Order Router
app.use("/order", orderRouter);

// Product Router
app.use("/product", productRouter);

// Seller Router
app.use("/seller", sellerRouter);

async function startServerAndDatabase() {
  await connectToDatabase();
  app.listen(process.env.PORT || 3000, () =>
    console.log(`Server live at ${process.env.PORT || 3000}`)
  );
}

startServerAndDatabase();
