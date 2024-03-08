// /product - Siddhi
// - GET / -> Seller hai to seller ke products, user hai to trending products
// - GET /categories
// - GET /:id - Product details
// - POST /review

// Express setup
const express = require("express");
const router = express.Router();

// Middleware to parse JSON requests
router.use(express.json());

// Controller setup
const { searchProducts, addReview, getTrendingProductsController } = require('../controllers/productController');
const {validateReviewLength, checkAbusiveWords} = require("../dependencies/validators/Reviews")
const {verifyJwt, getUserMiddleware} = require("../dependencies/jwtHelpers")

// Route for searching and filtering products
router.get('/search', searchProducts);

// Route for adding a review
router.post('/:id/review', verifyJwt, getUserMiddleware, validateReviewLength, checkAbusiveWords, addReview);

// Route to get trending products
// router.get('/', getTrendingProductsController);


module.exports = router;