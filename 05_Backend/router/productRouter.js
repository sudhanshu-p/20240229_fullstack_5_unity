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
/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search and filter products
 *     description: Retrieve products based on search query, category, ratings, price, and sorting.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: search_query
 *         schema:
 *           type: string
 *         description: Search query for products.
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Product category for filtering.
 *       - in: query
 *         name: ratings
 *         schema:
 *           type: number
 *         description: Ratings for filtering.
 *       - in: query
 *         name: price
 *         schema:
 *           type: number
 *         description: Price for filtering.
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sorting criteria for the results.
 *     responses:
 *       '200':
 *         description: Successful response with filtered products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Bad Request. Check the request parameters.
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid input. Please check the request parameters."
 *       '404':
 *         description: No products found.
 *         content:
 *           application/json:
 *             example:
 *               message: "No products found."
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error."
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         trending:
 *           type: boolean
 *         stock:
 *           type: number
 *         thumbnailUrl:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         seller_id:
 *           type: string
 *         category:
 *           type: string
 *         price:
 *           type: number
 *         discountPrice:
 *           type: number
 *         reviews:
 *           type: array
 *           items:
 *             type: string
 *         ratings:
 *           type: number
 */

router.get('/search', searchProducts);

// Route for adding a review
/**
 * @swagger
 * /products/{id}/review:
 *   post:
 *     summary: Add a review to a product
 *     description: Add a review to a specific product identified by ID.
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to add a review to.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ratingTitle:
 *                 type: string
 *                 description: Title of the review.
 *               ratingDescription:
 *                 type: string
 *                 description: Description of the review.
 *               ratings:
 *                 type: number
 *                 description: Numeric rating (between 1 and 5).
 *     responses:
 *       '200':
 *         description: Review added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 review:
 *                   $ref: '#/components/schemas/Review'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             example:
 *               error: "Rating should be a number between 1 and 5 (inclusive)."
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
 *               message: "Internal server error."
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         ratingTitle:
 *           type: string
 *         ratingDescription:
 *           type: string
 *         ratings:
 *           type: number
 *         productId:
 *           type: string
 *         userId:
 *           type: string
 */

router.post('/:id/review', verifyJwt, getUserMiddleware, validateReviewLength, checkAbusiveWords, addReview);

// Route to get trending products
/**
 * @swagger
 * /:
 *   get:
 *     summary: Get trending products
 *     description: Retrieve trending products based on the user's role.
 *     tags:
 *       - Products
 *     responses:
 *       '200':
 *         description: Successful response with trending products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 trendingProducts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       '403':
 *         description: Forbidden. Invalid role.
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid role"
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error."
 */

router.get('/', getTrendingProductsController);


module.exports = router;