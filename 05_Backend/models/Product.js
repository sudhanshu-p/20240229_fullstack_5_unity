// Schema for Product
// Table product_collection {
//   productId integer [primary key]
//   title varchar
//   description varchar
//   trending bool
//   stock integer [note: ">=0"]
//   thumbnailUrl varchar
//   images array
//   seller_id number
//   category varchar
//   price float
//   discountPrice float
//   reviews array [note: "Array<reviewId>"]
// }

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: Number,
    required: true,
  },
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
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  thumbnailUrl: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  images: {
    type: Array,
    required: true,
  },
  seller_id: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  reviews: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
