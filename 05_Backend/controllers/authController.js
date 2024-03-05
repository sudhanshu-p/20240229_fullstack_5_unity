// Responsible for logic related to authentication
// External dependencies
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Internal dependencies
const User = require("../models/user");
const {
  usernameValidator,
  emailValidator,
  passwordValidator,
  roleValidator,
} = require("../dependencies/validators/User");

// Register a new user
async function register(req, res) {
  const { username, email, password, role } = req.body;

  // Validate the user input
  if (
    !usernameValidator(username) ||
    !emailValidator(email) ||
    !passwordValidator(password) ||
    !roleValidator(role)
  ) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS);

    // Create a new user
    const user = new User({ username, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Login a user
async function login(req, res) {
  const { email, password } = req.body;

  // Validate the user input
  if (!emailValidator(email) || !passwordValidator(password)) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // Send the token in the response Body
    // Once the frontend and backend are connected,
    // the token will be sent in the response header
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { register, login };
