// Schema for Reviews
// Table reviews_collection {
//     reviewId integer [primary key]
//     ratingTitle varchar
//     ratingDescription varchar
//     ratings number
//     productId number
//     userId number
//   }

const mongoose = require("mongoose");

// Importing the models to reference them in the reviewSchema
const Product = require("./Product");
const User = require("./user");

const reviewSchema = new mongoose.Schema({
  ratingTitle: {
    type: String,
    required: true,
  },
  ratingDescription: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
