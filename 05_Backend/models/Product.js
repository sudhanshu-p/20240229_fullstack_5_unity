// Purpose: Model for Product.
const mongoose = require("mongoose");

// Importing the models to reference them in the productSchema
const Review = require("./Review");
const User = require("./user");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  description: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  trending: {
    type: Boolean,
  },
  stock: {
    type: Number,
    // required: true,
    min: 0,
  },
  thumbnailUrl: {
    type: String,
    // required: true,
    min: 6,
    max: 255,
  },
  images: {
    type: String,
    // required: true,
  },
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  category: {
    type: String,
    // required: true,
    min: 6,
    max: 255,
  },
  price: {
    type: Number,
    // required: true,
  },
  discountPrice: {
    type: Number,
    // required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  ratings: {
    type: Number,
    min: 1,
    max: 5,
  }
});

module.exports = mongoose.model("Product", productSchema);
