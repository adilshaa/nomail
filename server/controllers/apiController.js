// apiController.js
const { google } = require("googleapis");
const { checkgpt } = require("../MML/_openai.gpt.pretrained");
const { generateRequestMessage } = require("../MML/format.repsones");

const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);

// Scopes for Gmail API
const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

// Function to refresh access token
async function refreshAccessToken(refreshToken) {
	try {
		// Retrieve the refresh token from your storage
		if (!refreshToken) {
			throw new Error("No refresh token available");
		}

		oauth2Client.setCredentials({ refresh_token: refreshToken });
		console.log("refreshing");
		const { credentials } = await oauth2Client.refreshAccessToken();
		oauth2Client.setCredentials(credentials);
		console.log("Access token refreshed:", credentials.access_token);
	} catch (error) {
		console.error("Error refreshing access token", error);
	}
}

// Route to initiate OAuth flow
async function auth(req, res) {
	const authUrl = oauth2Client.generateAuthUrl({
		access_type: "offline",
		scope: SCOPES,
		prompt: "consent", // Force re-consent to get a refresh token
	});
	console.log(authUrl);
	res.json({ url: authUrl });
}

// Callback route to handle Google OAuth response
async function oauth2callback(req, res) {
	const { code } = req.query;
	try {
		const { tokens } = await oauth2Client.getToken(code);
		console.log(tokens);

		if (tokens.refresh_token) {
			// Save the refresh token to your database or secure storage
			console.log("Refresh token:", tokens.refresh_token);
		}

		res.redirect(
			`http://localhost:5175/home/profile?refreshToken=${tokens.refresh_token}&accessToken=${tokens.access_token}`
		); // Adjust the URL to match your frontend route
	} catch (error) {
		console.error("Error retrieving access token", error);
		res.status(500).send("Authentication failed.");
	}
}

// Send email route
async function sendEmail(req, res) {
	const { emails, subject, template, refreshToken } = req.body;
	try {
		console.log("Received refresh token:", refreshToken);

		const gmail = google.gmail({ version: "v1", auth: oauth2Client });
		const email = [
			`To: ${emails}`,
			`Subject: ${subject}`,
			"Content-Type: text/html; charset=UTF-8",
			"",
			`${template}`,
		].join("\n");

		const encodedMessage = Buffer.from(email)
			.toString("base64")
			.replace(/\+/g, "-")
			.replace(/\//g, "_")
			.replace(/=+$/, "");

		await gmail.users.messages.send({
			userId: "me",
			requestBody: {
				raw: encodedMessage,
			},
		});

		res.status(200).send({ messages: "Email sent successfully!" });
	} catch (error) {
		if (refreshToken) {
			console.log("Access token expired, refreshing...");
			await refreshAccessToken(refreshToken);

			// Retry sending the email after refreshing the token
			try {
				const gmail = google.gmail({ version: "v1", auth: oauth2Client });
				const email = [
					`To: ${emails}`,
					`Subject: ${subject}`,
					"Content-Type: text/html; charset=UTF-8",
					"",
					`${template}`,
				].join("\n");

				const encodedMessage = Buffer.from(email)
					.toString("base64")
					.replace(/\+/g, "-")
					.replace(/\//g, "_")
					.replace(/=+$/, "");

				await gmail.users.messages.send({
					userId: "me",
					requestBody: {
						raw: encodedMessage,
					},
				});

				return res.status(200).send({ messages: "Email sent successfully after refreshing token!" });
			} catch (retryError) {
				console.error("Failed to send email after refreshing token", retryError);
			}
		}

		res.status(500).send("Failed to send email.");
	}
}

// Generate code route
async function generateCode(req, res) {
	const { prompt } = req.body;
	console.log(prompt);

	const requirements = generateRequestMessage(prompt);
	let response = await checkgpt(requirements);
	console.log(JSON.parse(response[0].content).schema.code);

	res.json({ code: JSON.parse(response[0].content).schema.code });
}

module.exports = {
	auth,
	oauth2callback,
	sendEmail,
	generateCode,
};
