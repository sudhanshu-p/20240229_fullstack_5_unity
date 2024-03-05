const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/user");

async function checkout(req, res) {
  // Get Product Id, Product Quantity, Address Id, User Id from request body
  const { productId, quantity, addressId } = req.body;
  const userId = req.user._id;

  // Find the product by Id
  const product = Product.findOne({ _id: productId });

  //  If product is not found, return error
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Find the user by Id
  const user = User.findOne({ _id: userId });

  // If user is not found, return error
  if (!user) {
    return res.status(404).json({ message: "User not found" });
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
  });

  // Save the order
  await order.save();

  // Return success message
  res.status(200).json({ message: "Order placed successfully", order: order });
}
