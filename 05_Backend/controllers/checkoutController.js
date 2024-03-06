const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/user");

/** Handles checkout */
async function checkout(req, res) {
  // Get Product Id, Product Quantity, Address Id, User Id from request body
  const { productId, quantity, addressId } = req.body;
  const userId = req.user._id;

  try {
    // Find the product by Id
    const product = await Product.findOne({ _id: productId });
    //  If product is not found, return error
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Validate the product quantity
    if (product.stock < quantity || quantity <= 0) {
      return res.status(401).json({ message: "Invalid Quantity" });
    }

    // Get the user
    const user = req.user;

    // Validate the address ID belongs to the user
    const isAddressValid = user.addresses.find(
      (address) => address._id.toString() === addressId
    );

    if (!isAddressValid) {
      return res.status(401).json({ message: "Invalid Address" });
    }

    // Create a new order
    const order = new Order({
      productId,
      productQuantity: quantity,
      customerId: userId,
      sellerId: product.seller_id,
      orderStatus: "received",
      timePlaced: Date.now(),
      address: addressId,
      totalOrderValue: product.discountPrice * quantity,
    });

    // Save the order
    await order.save();

    // Update the product quantity
    product.stock -= quantity;
    await product.save();

    res
      .status(200)
      .json({ message: "Order placed successfully", order: order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { checkout };
