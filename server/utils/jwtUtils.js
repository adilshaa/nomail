const jwt = require("jsonwebtoken");
const secret = "enditySS";
// Function to generate a JWT token
function generateAccessToken(payload) {
	// Use a secure secret in production
	const options = { expiresIn: "1h" }; // Token expiration time
	return jwt.sign(payload, secret, options);
}

// Function to verify a JWT token
function verifyAccessToken(token) {
	try {
		return jwt.verify(token, secret);
	} catch (error) {
		throw new Error("Invalid token");
	}
}

module.exports = {
	generateAccessToken,
	verifyAccessToken,
};
