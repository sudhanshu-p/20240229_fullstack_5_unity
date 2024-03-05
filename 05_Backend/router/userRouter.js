// /user
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

// Address routes
// router.get("/address", verifyJwt, getUserMiddleware, userController.getUserAddresses);
router.post("/address", verifyJwt, getUserMiddleware, userController.createAddress);
router.put("/address", verifyJwt, getUserMiddleware, userController.updateAddress);
router.delete("/address", verifyJwt, getUserMiddleware, userController.deleteAddress);

// User routes
// router.get("/", verifyJwt, getUserMiddleware, userController.getUserDetails);
// router.put("/", verifyJwt, getUserMiddleware, userController.updateUserDetails);

module.exports = router;
