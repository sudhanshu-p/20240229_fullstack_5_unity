// /user - Gaurav
// - GET /address
// - POST /address
// - PUT /address
// - DELETE /address
// - GET /
// - PUT /

// Express setup
const express = require("express");
const router = express.Router();

// get useerController
const userController = require("../controllers/userController");

// Middleware setup
const { verifyJwt, getUserMiddleware } = require("../dependencies/jwtHelpers");



/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - role
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user.
 *         email:
 *           type: string
 *           format: email
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         role:
 *           type: string
 *           enum:
 *             - "user"
 *             - "admin"
 *           description: The role of the user.
 *         orders:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *             description: ID of an order associated with the user.
 *         products:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *             description: ID of a product associated with the user.
 *         addresses:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *             description: ID of an address associated with the user.
 *
 * /user/getUserAddresses:
 *   get:
 *     summary: Get all addresses of the logged-in user
 *     description: Retrieve all addresses associated with the currently logged-in user.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved user addresses
 *         content:
 *           application/json:
 *             example:
 *               addresses:
 *                 - _id: "address_id_1"
 *                   street: "123 Main St"
 *                   city: "Cityville"
 *                   state: "State"
 *                   postalCode: "12345"
 *                 - _id: "address_id_2"
 *                   street: "456 Oak Ave"
 *                   city: "Townsville"
 *                   state: "State"
 *                   postalCode: "67890"
 *       '404':
 *         description: No addresses found for the user
 *         content:
 *           application/json:
 *             example:
 *               message: "No addresses found"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error"
 *       securityDefinitions:
 *         BearerAuth:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 */

// Address routes
router.get("/getUserAddress", verifyJwt, getUserMiddleware, userController.getUserAddresses);


/**
 * @swagger
 * /user/createAddress:
 *   post:
 *     summary: Create a new user address
 *     description: Create a new address for the logged-in user.
 *     tags:
 *       - User 
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             # Correct path to the AddressInput schema
 *     responses:
 *       '201':
 *         description: Successfully created user address
 *         content:
 *           application/json:
 *             example:
 *               address:
 *                 _id: "address_id"
 *                 street: "123 Main St"
 *                 city: "Cityville"
 *                 state: "State"
 *                 postalCode: "12345"
 *               userId: "user_id"
 *       '400':
 *         description: Invalid input. Check the request body for errors.
 *         content:
 *           application/json:
 *             example:
 *               message: "Missing required address fields with valid address details"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error"
 *
 *       securityDefinitions:
 *         BearerAuth:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 * 
 */

router.post("/createAddress", verifyJwt, getUserMiddleware, userController.createAddress);
// router.post("/createAddress", userController.createAddress);
/**
 * @swagger
 * /user/updateAddress:
 *   put:
 *     summary: Update a user address
 *     description: Update an existing address for the logged-in user.
 *     tags:
 *       - User 
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the address to be updated.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               street:
 *                 type: string
 *                 description: The updated street address.
 *               city:
 *                 type: string
 *                 description: The updated city.
 *               state:
 *                 type: string
 *                 description: The updated state or province.
 *               postalCode:
 *                 type: string
 *                 description: The updated postal code or ZIP code.
 *     responses:
 *       '200':
 *         description: Successfully updated user address
 *         content:
 *           application/json:
 *             example:
 *               address:
 *                 _id: "address_id"
 *                 street: "Updated 123 Main St"
 *                 city: "Updated Cityville"
 *                 state: "Updated State"
 *                 postalCode: "Updated 12345"
 *               userId: "user_id"
 *       '400':
 *         description: Invalid input. Check the request body for errors.
 *         content:
 *           application/json:
 *             example:
 *               message: "Missing required address fields or invalid ID"
 *       '404':
 *         description: Address not found or unauthorized update.
 *         content:
 *           application/json:
 *             example:
 *               message: "Address not found or unauthorized update"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error"
 *       securityDefinitions:
 *         BearerAuth:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 */

router.put("/updateAddress", verifyJwt, getUserMiddleware, userController.updateAddress);

/**
 * @swagger
 * /user/deleteAddress:
 *   delete:
 *     summary: Delete a user address
 *     description: Delete an address for the logged-in user.
 *     tags:
 *       - User 
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the address to be deleted.
 *     responses:
 *       '200':
 *         description: Successfully deleted user address
 *         content:
 *           application/json:
 *             example:
 *               message: "Address deleted successfully"
 *       '400':
 *         description: Invalid input. Check the address ID.
 *         content:
 *           application/json:
 *             example:
 *               message: "Missing address ID"
 *       '404':
 *         description: Address not found or unauthorized deletion.
 *         content:
 *           application/json:
 *             example:
 *               message: "Address not found or unauthorized deletion"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error"
 *       securityDefinitions:
 *         BearerAuth:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 */

router.delete("/deleteAddress", verifyJwt, getUserMiddleware, userController.deleteAddress);

// User routes
/**
 * @swagger
 * /user/getUserDetails:
 *   get:
 *     summary: Get user details
 *     description: Retrieve details of the logged-in user, including associated addresses.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved user details
 *         content:
 *           application/json:
 *             example:
 *               username: "JohnDoe"
 *               email: "john.doe@example.com"
 *               addresses:
 *                 - firstName: "John"
 *                   lastName: "Doe"
 *                   streetAddress: "123 Main St"
 *                   state: "Apt 45"
 *                   zipcode: "12345"
 *                 - firstName: "Jane"
 *                   lastName: "Doe"
 *                   streetAddress: "456 Oak Ave"
 *                   state: "Apt 67"
 *                   zipcode: "67890"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error"
 *       securityDefinitions:
 *         BearerAuth:
 *         type: apiKey
 *         in: header
 *         name: Authorization
 */

router.get("/", verifyJwt, getUserMiddleware, userController.getUserDetails);
/**
 * @swagger
 * /updateUserDetails:
 *   put:
 *     summary: Update user details
 *     description: Update the username and email of the logged-in user.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: New username for the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: New email address for the user.
 *     responses:
 *       '200':
 *         description: Successfully updated user details
 *         content:
 *           application/json:
 *             example:
 *               userName: "UpdatedUsername"
 *               email: "updated.email@example.com"
 *       '402':
 *         description: Invalid input. Check the request body for errors.
 *         content:
 *           application/json:
 *             example:
 *               message: "Enter a valid username and email"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal server error"
 */

router.put("/", verifyJwt, getUserMiddleware, userController.updateUserDetails);

module.exports = router;
