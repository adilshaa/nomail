const mongoose = require("mongoose");

// Define the schema for Admin
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
	},
});

// Create a model from the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
