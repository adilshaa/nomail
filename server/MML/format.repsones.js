function parseGPTResponse(response) {
	console.log(response);

	const lines = response.split("\n");
	const result = [];
	let currentItem = null;

	lines.forEach((line) => {
		line = line;

		// Handle headers (e.g., ### Header)
		const headerMatch = line.match(/^(#+)\s+(.*)$/);
		if (headerMatch) {
			if (currentItem) {
				result.push(currentItem);
			}
			const level = headerMatch[1].length; // Number of '#' indicates header level
			currentItem = {
				type: "markdown-header",
				level: level,
				content: headerMatch[2],
			};
			result.push(currentItem);
			currentItem = null;
			return;
		}

		// Handle code blocks
		if (line.startsWith("```")) {
			if (currentItem && currentItem.type === "code") {
				// Close the code block
				result.push(currentItem);
				currentItem = null;
			} else {
				// Start a new code block
				const language = line.slice(3).trim() || "unknown";
				currentItem = {
					type: "code",
					language: language,
					content: "",
				};
			}
			return;
		}

		// If inside a code block, append content
		if (currentItem && currentItem.type === "code") {
			currentItem.content += line + "\n";
			return;
		}

		// Handle normal text
		if (line.length > 0) {
			if (currentItem && currentItem.type === "text") {
				currentItem.content += " " + line;
			} else {
				if (currentItem) {
					result.push(currentItem);
				}
				console.log("current line ⭐⭐", line);
				if (JSON.parse(line)) {
					currentItem = {
						type: "json",
						content: line,
					};
				} else {
					currentItem = {
						type: "text",
						content: line,
					};
				}
			}
		} else if (currentItem) {
			result.push(currentItem);
			currentItem = null;
		}
	});

	if (currentItem) {
		result.push(currentItem);
	}

	return result;
}

const generateRequestMessage = (prompt) => {
	try {
		console.log(prompt);

		prompt = prompt;
		// let refrence = ``;
		let messages = [];

		messages = [
			{
				role: "system",
				content: `You are a helpful assistant that writes email contents in text and html formate based on user Description.  
				 Always generate json object and return as a json code`,
			},
		];

		// Construct the main prompt
		const mainPrompt = `
			  Description: ${prompt}
			  
			  Generate source code based on the description above and respond in the following JSON format ONLY:
				\`\`\`json
					{
					"name": "Content subject",
					"schema": {
						"type": "string",
						"code": "Generated email content here"
					}
					}
					\`\`\`
			  
			  IMPORTANT:
			  - Ensure the JSON response is error-free.
			  - Include no additional text or explanations. Respond with the JSON object only.
			  `;

		messages.push({ role: "user", content: mainPrompt });

		return messages;
	} catch (error) {
		console.log(error);
	}
};

function isObject(value) {
	return value !== null && typeof value === "object";
}

function extractJSONObject(str) {
	// Use a regular expression to match the JSON object
	const jsonStringMatch = str.match(/{.*}/);
	if (jsonStringMatch) {
		try {
			// Parse the matched JSON string into an object
			return JSON.parse(jsonStringMatch[0]);
		} catch (error) {
			console.error("Invalid JSON format:", error);
			return null;
		}
	} else {
		console.error("No JSON object found in the string.");
		return null;
	}
}

module.exports = {
	generateRequestMessage,
	parseGPTResponse,
	extractJSONObject,
	isObject,
};

// content: ` You are a coding assistant Strictly adhere to the provided reference code and descriptions. Avoid any deviations or alternative implementations unless explicitly instructed by the user..

// Please generate the code for above tasks, following the instructions and including comments for clarity and logic for tasks must needed.

// 		While creating router for specifict file your have to read supporing file data and create for that

// 		 **Output Formats**:

// Return dependencies like this \`const bcrypt = require('bcrypt');\`  in this formate
// \`\`\`dependencies
// const bcrypt = require('bcrypt');
// \`\`\`

// Ensure this format is consistently followed in responses.
