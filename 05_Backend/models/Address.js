// Schema for Address
// Table residencies {
//     addressId integer [primary key]
//     firstName varchar
//     lastName varchar
//     streertAddress varchar
//     apartmentNumber varchar
//     state varchar
//     zipcode number
//   }

const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  apartmentNumber: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipcode: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Address", addressSchema);
