//External Dependencies
const mongoose = require("mongoose");

// Internal Dependencies
const User = require("../models/user");
const Address = require("../models/Address");
const {
  emptyAddress,
  basicFieldsCheck,
  validateFields,
} = require("../dependencies/validators/Address");

async function getUserAddresses(req, res) {
  try {
    // Ensure authorized user
    const user = await User.find({_id:req.user._id});
    console.log(user[0])
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract address IDs
    console.log(typeof user[0].addresses)
    const addressIds = user[0].addresses.map((address) => address._id);

    // Find Multiple addresses by ID
    const addresses = await Address.find({ _id: { $in: addressIds } });

    //   check if addresses found is empty or not
    if (emptyAddress(addresses)) {
      return res.status(404).json({ message: "No addresses found" });
    }

    res.status(200).json({ addresses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function createAddress(req, res) {
  try {
    // Ensure authorized user
    let user = await User.find({ _id: req.user.id });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract address data from the request body
    let addressDetails = req.body;

    // Validate address fields
    if (!basicFieldsCheck(addressDetails)) {
      return res
        .status(400)
        .json({ message: "Missing required address fields" });
    }

    // Validate address values
    if (!validateFields(addressDetails)) {
      return res
        .status(400)
        .json({ message: "Please enter valid address details" });
    }

    // Create a new user address object
    address = new Address({
      ...addressDetails,
      // Link address to the user (assuming 'user_id' field in Address)
      userId: req.user._id,
    });

    // Save the new address
    const savedAddress = await address.save();

    // Find the address by ID and ensure it belongs to the user
    user = await User.findById(savedAddress.userId);

    // Update user's address ID 
    user.addresses.push(savedAddress._id)

    // Persist the updated user object 
    await user.save(); 

    res.status(201).json({ address: savedAddress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateAddress(req, res) {
  try {

    const addressId = req.query.id; // Assuming address ID comes from the route path
    // Check if the address exists first
    const addressToChange = await Address.find({_id:addressId});
    console.log(addressToChange)
    console.log("done")
    if (!addressToChange) {
      return res.status(404).json({ message: "Address not found" });
    }

    // all the changes to make
    const requestedAddress = req.body;

    // Validate address ID and data (consider using a validator)
    if (!basicFieldsCheck(requestedAddress)) {
      return res
        .status(400)
        .json({ message: "Missing required address fields or invalid ID" });
    }

    // Find the address by ID and ensure it belongs to the user
    const address = await Address.findById(addressId);
    if (!address || address.userId.toString() !== req.user._id.toString()) {
      return res
        .status(404)
        .json({ message: "Address not found or unauthorized update" });
    }

    // Update address details
    address.firstName = requestedAddress.firstName;
    address.lastName = requestedAddress.lastName;
    address.streetAddress = requestedAddress.streetAddress;
    address.apartmentNumber = requestedAddress.apartmentNumber;
    address.state = requestedAddress.state;
    address.zipcode = requestedAddress.zipcode;

    // Save the updated address
    const updatedAddress = await address.save();

    res.status(200).json({ address: updatedAddress });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteAddress(req, res) {
  try {
    const addressId = req.query.id;
    console.log(addressId);
    // Validate address ID (consider using a validator)
    if (!addressId) {
      return res.status(400).json({ message: "Missing address ID" });
    }

    // Find the address by ID and ensure it belongs to the user
    // console.log("error here1")
    const address = await Address.findByIdAndDelete(
      mongoose.Types.ObjectId(addressId)
    );
    console.log(address);
    console.log("error here");
    if (!address || address.userId.toString() !== req.user._id.toString()) {
      return res
        .status(404)
        .json({ message: "Address not found or unauthorized deletion" });
    }

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getUserAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
};
