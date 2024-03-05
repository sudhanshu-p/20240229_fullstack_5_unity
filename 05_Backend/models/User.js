// External dependencies
const mongoose = require("mongoose");

// Importing the models to reference them in the userSchema
const Address = require("./Address");
const Product = require("./Product");
const Order = require("./Order");

// Other internal dependencies
const { userRoles } = require("../dependencies/globals");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: userRoles,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  addresses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
