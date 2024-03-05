// Schema for Order
const mongoose = require("mongoose");

// Importing the models to reference them in the orderSchema
const Product = require("./Product");
const User = require("./user");
const Address = require("./Address");

const orderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    enum: ["received", "packed", "shipped", "out-for-delivery", "delivered"],
  },
  timePlaced: {
    type: Date,
    required: true,
    default: Date.now,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
