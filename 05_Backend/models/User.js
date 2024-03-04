// Schema for User
// Table user_collection {
//     userId integer [primary key]
//     username varchar
//     email varchar [unique]
//     password varchar
//     role enum [note: "User | Seller | Admin"]
//     orders array
//     products array
//     addresses array
//   }

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
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
    enum: ["User", "Seller", "Admin"],
  },
  orders: {
    type: Array,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  addresses: {
    type: Array,
    required: true,
  },
});
