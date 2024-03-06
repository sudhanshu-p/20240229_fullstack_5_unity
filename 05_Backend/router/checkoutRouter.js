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

router.post("/", verifyJwt, getUserMiddleware, checkoutController.checkout);

// Exporting the router
module.exports = router;
