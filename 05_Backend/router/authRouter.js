// /auth
// - /signin
// - /signup

// Setting up the express router
const express = require("express");
const router = express.Router();

// Controller
const authController = require("../controllers/authController");

// Routes
router.post("/signup", authController.register);
router.post("/signin", authController.login);



// Exporting the router
module.exports = router;
