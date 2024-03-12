//External Dependencies
const mongoose = require("mongoose");

// Internal Dependencies
const User = require("../models/user");
const Address = require("../models/Address");
const {
  emptyAddress,
  basicFieldsCheck,
  validateFields,
} = require("../dependencies/validators/Address");

const{
    emailValidator,
    usernameValidator,
}= require("../dependencies/validators/User");
const { request } = require("express");


/**
* @swagger
* /api/user/addresses:
*   get:
*     summary: Get all the addresses of a user.
*     tags: [User Addresses]
*     responses:
*       '200':
*         description: A list of addresses belonging to the user.
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Address'
*       '404':
*         description: No addresses found.
*/
async function getUserAddresses(req, res) {
  try {
    // get user
    const user = req.user

    // console.log(addressIds)

    // Find Multiple addresses by ID
    const addresses = await Address.find({ _id: { $in: user.addresses } });

    console.log(addresses)
    //   check if addresses found is empty or not
    if (emptyAddress(addresses)) {
      return res.status(404).json({ message: "No addresses found" });
    }

    //Send status with addresses
    res.status(200).json({ addresses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}





/**
* @swagger
* /user/address:
*   post:
*     security:
*       - bearerAuth: []
*     summary: Create a new address.
*     tags: [User Addresses]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Address'
*     responses:
*       '201':
*         description: Address created successfully.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Address'
*       '400':
*         description: Missing required address fields with valid address details.
*/
async function createAddress(req, res) {
  try {
    // Extract address data from the request body
    let addressDetails = req.body;

    // Validate address fields & Validate address values
    if (!basicFieldsCheck(addressDetails) 
        || !validateFields(addressDetails)) {
      return res
        .status(400)
        .json({ message: 
          "Missing required address fields with valid address details" });
    }

    // Create a new user address object
    address = new Address({
      ...addressDetails,
      userId: req.user._id, // Link address to the user
    });
    const savedAddress = await address.save(); // Save the new address

    // Find the address by ID and ensure it belongs to the user
    user = await User.findById(savedAddress.userId);

    user.addresses.push(savedAddress._id) // Update user's address ID
    await user.save(); // Persist the updated user object
    res.status(201).json({ address: savedAddress });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}





/**
 * @swagger
 * /api/user/address/{id}:
 *   put:
 *     summary: Update an existing address.
 *     tags: [User Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the address to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Add properties based on your Address schema
 *     responses:
 *       '200':
 *         description: Address updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 address:
 *                   $ref: '#/components/schemas/Address'
 *       '400':
 *         description: Missing required address fields or invalid ID.
 *       '404':
 *         description: Address not found or unauthorized update.
 *       '500':
 *         description: Internal server error.
 */
async function updateAddress(req, res) {
  try {
    const addressId = req.query.id; // Assuming address ID comes from the route path

    // Check if the address exists first
    const addressToChange = await Address.find({_id:addressId});
    if (!addressToChange) {
      return res.status(404).json({ message: "Address not found" });
    }
    const requestedAddress = req.body; //changes to update

    // Validate address ID and data 
    if (!basicFieldsCheck(requestedAddress)) {
      return res
        .status(400)
        .json({ message: "Missing required address fields or invalid ID" });
    }
    // Find the address by ID and ensure it belongs to the user
    const address = await Address.findById(addressId);
    if (!address || address.userId.toString() !== req.user._id.toString()) {
      return res
        .status(404)
        .json({ message: "Address not found or unauthorized update" });
    }
    
    // Update address details
    const keys = Object.keys(requestedAddress);
    for(let oneAdressField of keys){
      address[oneAdressField]=requestedAddress[oneAdressField];
    }
    const updatedAddress = await address.save(); // Save the updated address
    res.status(200).json({ address: updatedAddress });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}



/**
 * @swagger
 * /api/user/address/{id}:
 *   delete:
 *     summary: Delete an address.
 *     tags: [User Addresses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the address to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Address deleted successfully.
 *       '400':
 *         description: Missing address ID.
 *       '404':
 *         description: Address not found or unauthorized deletion.
 */
async function deleteAddress(req, res) {
  try {
    // get user and address Id to delete
    const addressId = req.query.id;
    user = req.user;

    // Validate address ID (consider using a validator)
    if (!addressId) {
      return res.status(400).json({ message: "Missing address ID" });
    }

    // Find the address by ID and ensure it belongs to the user
    const address = await Address.findByIdAndDelete(
      new mongoose.Types.ObjectId(addressId)
    );

    if (!address || address.userId.toString() !== req.user._id.toString()) {
      return res
        .status(404)
        .json({ message: "Address not found or unauthorized deletion" });
    }

    //update the addresses id in user
    user.addresses=user.addresses.filter(singleAddress=>
      singleAddress.toString()!=addressId
      )
    const addressDeleted= await user.save()
    res.status(200).json({ message: `${addressDeleted} Address deleted successfully`});
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}





/**
 * @swagger
 * /api/user/details:
 *   get:
 *     summary: Get user details including addresses.
 *     tags: [User Details]
 *     responses:
 *       '200':
 *         description: User details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: Username of the user.
 *                 email:
 *                   type: string
 *                   description: Email of the user.
 *                 addresses:
 *                   type: array
 *                   description: Array of user addresses.
 *                   items:
 *                     type: object
 *                     properties:
 *                       firstName:
 *                         type: string
 *                         description: First name in the address.
 *                       lastName:
 *                         type: string
 *                         description: Last name in the address.
 *                       streetAddress:
 *                         type: string
 *                         description: Street address.
 *                       apartmentNumber:
 *                         type: string
 *                         description: Apartment number.
 *                       zipCode:
 *                         type: string
 *                         description: Zip code.
 *       '500':
 *         description: Internal server error.
 */
async function getUserDetails(req,res){
    try{
        //get the user details
        let user= req.user
        //initiate the final address array to return
        let addressDetails=[]

        // loop through all the address of user and store it
        for(let addressid in user.addresses){
            let CompleteAddress= await Address.findOne({_id: user.addresses[addressid]})
            addressDetails.push({
                "first Name": CompleteAddress.firstName,
                "Last Name": CompleteAddress.lastName,
                "Street Address": CompleteAddress.streetAddress,
                "Apartment Number": CompleteAddress.state,
                "zipCode": CompleteAddress.zipcode
            })
        }
        
        // final object to return 
        let objectToReturn = {
        "username": user.username,
        "email": user.email,
        "addresses": addressDetails
    }
    //return the status code with object
    res.status(200).json(objectToReturn)
    }catch(err){
        res.status(500).json({message: "internal server error"})
    }
}



/**
 * @swagger
 * /api/user/update:
 *   put:
 *     summary: Update user details.
 *     tags: [User Details]
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
 *                 description: New email for the user.
 *     responses:
 *       '200':
 *         description: User details updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *                   description: Updated username.
 *                 email:
 *                   type: string
 *                   description: Updated email.
 *       '402':
 *         description: Invalid username or email.
 *       '500':
 *         description: Internal server error.
 */
async function updateUserDetails(req,res){
    try{
    // check if the username and email is valid or not
    if(!(usernameValidator(req.body.username)) || !(emailValidator(req.body.email))){
        res.status(402).json({message: "enter valid username and email"})
    }

    // update the user name and email
    let user= req.user;
    user.username=req.body.username;
    user.email= req.body.email
    console.log(user)

    // Save the updated profile
    const updatedUser = await user.save();

    //send the updated profile info
    res.status(200).json({ 
        "user Name": updatedUser.username,
        "Email" : updatedUser.email
 });
    }catch(err){
        res.status(500).json({message: "internal server error"})
    }
}



module.exports = {
  getUserAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  getUserDetails,
  updateUserDetails
};

