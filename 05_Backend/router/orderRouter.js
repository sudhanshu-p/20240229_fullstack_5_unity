// /order - Me
// - PUT /:id - Status updating
// - GET /:id - Order details
// - GET / -> Seller hai to seller ke orders, user hai to user ke orders

// Express setup
const express = require("express");
const router = express.Router();

// Controller setup
const orderController = require("../controllers/orderController");

// Middleware setup
const { verifyJwt, getUserMiddleware } = require("../dependencies/jwtHelpers");

// Routes
router.put("/:id", verifyJwt, getUserMiddleware, orderController.updateStatus);

router.get("/:id", verifyJwt, getUserMiddleware, orderController.getOrderDetails);

router.get("/", verifyJwt, getUserMiddleware, orderController.getOrders);

module.exports = router;
