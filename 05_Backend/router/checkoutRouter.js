// /auth
// - /signin
// - /signup

// Setting up the express router
const express = require("express");
const router = express.Router();

// Controller
const checkoutController = require("../controllers/checkoutController");
const { verifyJwt, getUserMiddleware } = require("../dependencies/jwtHelpers");

// Routes
/**
 * @swagger
 * /:
 *   post:
 *     summary: Place an order (Checkout)
 *     description: Place an order for a product with a specified quantity and delivery address.
 *     tags:
 *       - Checkout
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to be ordered.
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product to be ordered.
 *               addressId:
 *                 type: string
 *                 description: ID of the delivery address.
 *     responses:
 *       '200':
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                 order:
 *                   $ref: '#/components/schemas/Order'
 *       '401':
 *         description: Invalid Quantity or Address
 *         content:
 *           application/json:
 *             example:
 *               message: |
 *                 Invalid Quantity or Invalid Address
 *       '404':
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Product not found."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *         productQuantity:
 *           type: number
 *         customerId:
 *           type: string
 *         sellerId:
 *           type: string
 *         orderStatus:
 *           type: string
 *           enum: [received, processing, shipped, delivered]
 *         timePlaced:
 *           type: string
 *           format: date-time
 *         address:
 *           type: string
 *         totalOrderValue:
 *           type: number
 */

router.post("/", verifyJwt, getUserMiddleware, checkoutController.checkout);

// Exporting the router
module.exports = router;
