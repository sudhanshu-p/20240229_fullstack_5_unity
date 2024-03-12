
const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/sellerController");
const { verifyJwt, getUserMiddleware } = require("../dependencies/jwtHelpers");


/**
 * @swagger
 * /createProduct:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product or add products in the e-commerce system.
 *     tags:
 *       - Sellers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     description: Name of the product.
 *                   description:
 *                     type: string
 *                     description: Description of the product.
 *                   trending:
 *                     type: boolean
 *                     description: Indicates if the product is trending.
 *                   stock:
 *                     type: number
 *                     description: Available stock.
 *                   thumbnailUrl:
 *                     type: string
 *                     description: URL of the product's thumbnail.
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: Array of URLs for product images.
 *                   seller_id:
 *                     type: string
 *                     description: ID of the seller.
 *                   category:
 *                     type: string
 *                     description: Product category.
 *                   price:
 *                     type: number
 *                     description: The price of the product.
 *                   discountPrice:
 *                     type: number
 *                     description: The discounted price of the product.
 *                   reviews:
 *                     type: string
 *                     description: ID of the review associated with the product.
 *                   ratings:
 *                     type: array
 *                     description: The product's rating.
 *                   
 *     responses:
 *       '200':
 *         description: Successfully created product
 *         content:
 *           application/json:
 *             example:
 *               product:
 *                 title: "Smartphone X"
 *                 description: "A powerful and feature-rich smartphone."
 *                 trending: true
 *                 stock: 100
 *                 thumbnailUrl: "https://example.com/thumbnail.jpg"
 *                 images:
 *                   - "https://example.com/image1.jpg"
 *                   - "https://example.com/image2.jpg"
 *                 seller_id: "123456789012345678901234"
 *                 category: "Electronics"
 *                 price: 499.99
 *                 discountPrice: 399.99
 *                 reviews: []
 *                 ratings: 4.5
 *               createdAt: 2024-03-15T12:00:00Z
 *       '400':
 *         description: Invalid input. Check the request body for errors.
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid input"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error"
 */




router.post("/product", verifyJwt, getUserMiddleware, sellerController.createProduct);



/**
 * @swagger
 * /updateProduct:
 *   put:
 *     summary: Update a product
 *     description: Update an existing product in the e-commerce system.
 *     tags:
 *       - Sellers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the product to be updated.
 *               title:
 *                 type: string
 *                 description: New name of the product.
 *               description:
 *                 type: string
 *                 description: New description of the product.
 *               stock:
 *                 type: number
 *                 description: New available stock.
 *               thumbnailUrl:
 *                 type: string
 *                 description: New URL of the product's thumbnail.
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: New array of URLs for product images.
 *               category:
 *                 type: string
 *                 description: New product category.
 *               price:
 *                 type: number
 *                 description: New price of the product.
 *               discountPrice:
 *                 type: number
 *                 description: New discounted price of the product.
 *     responses:
 *       '200':
 *         description: Successfully updated product
 *         content:
 *           application/json:
 *             example:
 *               product:
 *                 title: "Updated Smartphone X"
 *                 description: "An updated and feature-rich smartphone."
 *                 stock: 150
 *                 thumbnailUrl: "https://example.com/updated-thumbnail.jpg"
 *                 images:
 *                   - "https://example.com/updated-image1.jpg"
 *                   - "https://example.com/updated-image2.jpg"
 *                 category: "Updated Electronics"
 *                 price: 599.99
 *                 discountPrice: 499.99
 *               updatedAt: "2024-03-16T12:00:00Z"
 *       '400':
 *         description: Invalid input. Check the request body for errors.
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid input"
 *       '401':
 *         description: Unauthorized. User is not the seller of this product.
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized for this product"
 *       '404':
 *         description: Product not found.
 *         content:
 *           application/json:
 *             example:
 *               message: "Product not found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error"
 */

router.put("/product", verifyJwt, getUserMiddleware, sellerController.updateProduct);

/**
 * @swagger
 * /deleteProduct:
 *   delete:
 *     summary: Delete a product
 *     description: Delete an existing product from the e-commerce system.
 *     tags:
 *       - Sellers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the product to be deleted.
 *     responses:
 *       '200':
 *         description: Successfully deleted product
 *         content:
 *           application/json:
 *             example:
 *               message: "Product deleted"
 *       '401':
 *         description: Unauthorized. User is not the seller of this product.
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized for this product"
 *       '404':
 *         description: Product not found.
 *         content:
 *           application/json:
 *             example:
 *               message: "Product not found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error"
 */


router.delete("/product", verifyJwt, getUserMiddleware, sellerController.deleteProduct);

router.post("/dashboard", verifyJwt, getUserMiddleware, sellerController.getDashboard);

module.exports = router;
