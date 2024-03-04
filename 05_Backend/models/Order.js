// Schema for Order
/* Table orders_collection {
    orderId integer [primary key]
    productId integer
    productQuantity integer
    customerId integer
    sellerId integer
    orderStatus varchar
    timePlaced datetime
  }*/
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    required: true,
  },
  productId: {
    type: Number,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
  customerId: {
    type: Number,
    required: true,
  },
  sellerId: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
  },
  timePlaced: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
