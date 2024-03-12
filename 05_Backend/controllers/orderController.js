// Internal dependencies
const Order = require("../models/Order");
const Product = require("../models/Product");
const { orderStatusValidator } = require("../dependencies/validators/Order");





/**
 * Controller for updating order status.
 * 
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Update order status.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to update status.
 *         schema:
 *           type: string
 *       - in: body
 *         name: status
 *         description: New status for the order.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *     responses:
 *       '200':
 *         description: Updated order status.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '400':
 *         description: Invalid input.
 *       '401':
 *         description: Unauthorized.
 *       '404':
 *         description: Order not found.
 *       '500':
 *         description: Internal server error.
 */
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
  if (req.user._id !== order.user_id && req.user._id !== order.seller_id) {
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





/**
 * Controller for getting order details.
 * 
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order details.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to retrieve details.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Order details along with associated product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       '401':
 *         description: Unauthorized for this Order.
 *       '404':
 *         description: Order not found.
 *       '500':
 *         description: Internal server error.
 */
async function getOrderDetails(req, res) {
  // Get the order id from the request
  const { id } = req.params;

  // Check if the order exists
  try {
    const order = await Order.findOne({ _id: id });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the user is authorized to view the order
    if (
      !req.user._id.equals(order.user_id) &&
      !req.user._id.equals(order.seller_id)
    ) {
      return res.status(401).json({ message: "Unauthorized for this Order" });
    }

    // Get the product details for the order
    const product = await Product.findById(order.product_id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ order, product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}





/**
 * Controller for getting orders.
 * 
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get orders.
 *     tags:
 *       - Orders
 *     responses:
 *       '200':
 *         description: List of orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       '400':
 *         description: Invalid user role.
 *       '404':
 *         description: No orders found.
 *       '500':
 *         description: Internal server error.
 */
async function getOrders(req, res) {
  // Get the user id from the request
  const { id } = req.user;

  // Get the orders based on the user type
  let orders;
  if (req.user.role === "seller") {
    orders = await Order.find({ seller_id: id });
  } else if (req.user.role === "user") {
    orders = await Order.find({ user_id: id });
  } else if (req.user.role === "admin") {
    orders = await Order.find({});
  } else {
    return res.status(400).json({ message: "Invalid user role" });
  }

  // If no orders found
  if (orders.length === 0) {
    return res.status(404).json({ message: "No orders found" });
  }

  res.status(200).json({ orders });
}

// Export the controllers
module.exports = { updateStatus, getOrderDetails, getOrders };
