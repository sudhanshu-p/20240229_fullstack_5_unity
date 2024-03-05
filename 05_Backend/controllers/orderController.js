// Internal dependencies
const Order = require("../models/Order");
const Product = require("../models/Product");
const { orderStatusValidator } = require("../dependencies/validators/Order");

/** Controller for updating order status */
async function updateStatus(req, res) {
  // Get the order id and status from the request
  const { id } = req.params;
  const { status } = req.body;

  // Validate the input
  if (!orderStatusValidator(status)) {
    return res.status(400).json({ message: "Invalid input" });
  }

  // Check if the order exists
  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  // Check if the user is authorized to update the order
  if (req.user.id !== order.user_id && req.user.id !== order.seller_id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Update the order status
  order.status = status;

  try {
    // Save the updated order
    const savedOrder = await order.save();
    res.status(200).json({ order: savedOrder });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

/** Controller for getting order details */
async function getOrderDetails(req, res) {
  // Get the order id from the request
  const { id } = req.params;

  // Check if the order exists
  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  // Check if the user is authorized to view the order
  if (req.user.id !== order.user_id && req.user.id !== order.seller_id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Get the product details for the order
  const product = await Product.findById(order.product_id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({ order, product });
}

/** Controller for getting orders */
async function getOrders(req, res) {
  // Get the user id from the request
  const { id } = req.user;

  // Get the orders based on the user type
  let orders;
  if (req.user.type === "seller") {
    orders = await Order.find({ seller_id: id });
  } else {
    orders = await Order.find({ user_id: id });
  }

  // If no orders found
  if (orders.length === 0) {
    return res.status(404).json({ message: "No orders found" });
  }

  res.status(200).json({ orders });
}

// Export the controllers
module.exports = { updateStatus, getOrderDetails, getOrders };
