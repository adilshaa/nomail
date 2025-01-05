const User = require("../models/User"); // Adjust the path as necessary
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../utils/jwtUtils"); // Reuse the JWT utility function

// Controller function for registering a user
async function registerUser(req, res) {
	try {
		const { name, email, password } = req.body;

		// Validate input
		if (!name || !email || !password) {
			return res.status(400).json({ message: "Name, email, and password are required." });
		}

		// Check if the email is already registered
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "Email is already registered." });
		}

		// Hash the password before saving
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user
		const newUser = new User({
			name,
			email,
			password: hashedPassword, // Save the hashed password
		});

		// Save the user to the database
		await newUser.save();

		res.status(201).json({ message: "User registered successfully", user: newUser });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
}

// Controller function for logging in a user
async function loginUser(req, res) {
	try {
		const { email, password } = req.body;

		// Validate input
		if (!email || !password) {
			return res.status(400).json({ message: "Email and password are required." });
		}

		// Find the user by email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: "Invalid email or password." });
		}

		// Compare the provided password with the stored hashed password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: "Invalid email or password." });
		}

		// Generate a JWT token using the utility function
		const token = generateAccessToken({ id: user._id });

		res.status(200).json({ message: "Login successful", token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
}

// Export functions separately
module.exports = {
	registerUser,
	loginUser,
};
