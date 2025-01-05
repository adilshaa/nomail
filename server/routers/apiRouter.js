const express = require("express");

const apiController = require("../controllers/apiController"); // Import the apiController

const app = express();

// Use apiController for routes
app.get("/auth", apiController.auth);
app.get("/oauth2callback", apiController.oauth2callback);
app.post("/send-email", apiController.sendEmail);
app.post("/generate-code", apiController.generateCode);

module.exports = app;
