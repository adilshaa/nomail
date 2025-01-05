const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController"); // Adjust the path as necessary

// Registration route for admins
router.post("/register", userController.registerUser);

// Login route for admins
router.post("/login", userController.loginUser);

module.exports = router;
