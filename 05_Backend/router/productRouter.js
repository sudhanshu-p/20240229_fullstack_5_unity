// /product
// - GET / -> Seller hai to seller ke products, user hai to trending products
// - GET /categories
// - GET /:id - Product details
// - POST /review

// Express setup
const express = require("express");
const router = express.Router();
const { addReview } = require('./reviewController');
const { searchProducts } = require('./productController');
const { getTrendingProductsController } = require('./productController');


// Middleware to parse JSON requests
router.use(express.json());

// Controller setup
const { getProducts, getCategories, getProductDetails, postReview } = require('../controllers/productController');

// Route for searching and filtering products
router.get('/search', searchProducts);

// Route for adding a review
router.post('/:id/review', validateReviewLength, checkAbusiveWords, addReview);

// Route to get trending products
router.get('/', getTrendingProductsController);


module.exports = router;