// db.js
const mongoose = require("mongoose");
require("dotenv").config();

// Replace 'your_mongodb_uri' with your actual MongoDB URI
const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/nomail";

const connectDB = async () => {
	try {
		await mongoose.connect(dbURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("MongoDB connected successfully");
	} catch (err) {
		console.error("MongoDB connection error:", err.message);
		process.exit(1);
	}
};

module.exports = connectDB;
