// /seller - Me
// - POST /product
// - PUT /product
// - DELETE /product
// - POST /dashboard

// Express setup
const express = require("express");
const router = express.Router();

// Controller setup
const sellerController = require("../controllers/sellerController");
const { verifyJwt, getUserMiddleware } = require("../dependencies/jwtHelpers");

// Routes
router.post("/product", verifyJwt, getUserMiddleware, sellerController.createProduct);

router.put("/product", verifyJwt, getUserMiddleware, sellerController.updateProduct);

router.delete("/product", verifyJwt, getUserMiddleware, sellerController.deleteProduct);

router.post("/dashboard", verifyJwt, getUserMiddleware, sellerController.getDashboard);

module.exports = router;
