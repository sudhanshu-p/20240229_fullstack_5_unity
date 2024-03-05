// /auth
// - /signin
// - /signup

// Setting up the express router
const express = require("express");
const router = express.Router();

// Controller
const authController = require("../controllers/authController");

// Routes
router.post("/signin", authController.login);

router.post("/signup", authController.register);

// Exporting the router
module.exports = router;
