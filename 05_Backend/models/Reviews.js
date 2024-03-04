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

const reviewSchema = new mongoose.Schema({
  reviewId: {
    type: Number,
    required: true,
  },
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
    type: Number,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
