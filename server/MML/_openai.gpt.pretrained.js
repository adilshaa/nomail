const { default: axios } = require("axios");
const { parseGPTResponse, generateRequestMessage, isObject, extractJSONObject } = require("./format.repsones");

const env = require("dotenv");
env.config();
// GPT = "gpt-4o";
const MODEL = "gpt-4o" || "GPT-4";
const GPT = env.GPT_URL || process.env.GPT_URL;
async function checkgpt(messages) {
	console.log(messages);

	try {
		const response = await axios
			.post(
				GPT,
				{
					messages: messages,
					markdown: false,
					model: MODEL,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then(async (result) => {
				let id = result.data.id;

				let response = null;
				let data = true;
				while (data) {
					// await sleep(1000);
					response = await axios.get("https://nexra.aryahcr.cc/api/chat/task/" + encodeURIComponent(id));
					response = response.data;
					console.log(response);

					switch (response.status) {
						case "pending":
							data = true;
							break;
						case "error":
						case "completed":
						case "not_found":
							data = false;
							break;
					}
				}
				let input = response;

				if (!isObject(input)) {
					input = extractJSONObject(input);
					// input = JSON.parse(input.replace(/\x1E/g, ""));
				}

				let gptResponse;
				if (MODEL == "GPT-4" || MODEL == "gpt-4-32k" || MODEL == "gpt-4") {
					gptResponse = input.gpt;
				} else {
					gptResponse = input.message;
				}

				let extracted = parseGPTResponse(gptResponse);
				console.log(extracted, "extracted object ❤️❤️");

				return extracted; // Return the extracted response
			})
			.catch((error) => {
				console.error("Error:", error);
			});

		return response;
	} catch (error) {
		console.error("Error:", error);
		throw new Error("Error occurred during the request");
	}
}

// ------------------- parser ------------------

module.exports = { checkgpt };
