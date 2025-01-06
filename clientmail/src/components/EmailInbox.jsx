// EmailInbox.jsx
import React, { useState } from "react";
import { get, post } from "../services/apiService";
import Cookies from "js-cookie"; // Import js-cookie
import { useEffect } from "react";

const EmailInbox = ({ prompt }) => {
	const [emails, setEmails] = useState([]);
	const [emailInput, setEmailInput] = useState("");
	const [isInvalidEmail, setIsInvalidEmail] = useState(false);
	const [subject, setSubject] = useState(""); // State for subject
	const [refreshToken, setRefreshToken] = useState("");

	useEffect(() => {
		// Retrieve the refresh token from cookies
		const refreshToken = Cookies.get("refreshToken");
		if (refreshToken) {
			setRefreshToken(refreshToken);
			console.log("Refresh Token:", refreshToken);
			// You can use the refresh token here as needed
		}
	}, []);
	const handleEmailInputChange = (e) => {
		setEmailInput(e.target.value);
		setIsInvalidEmail(false); // Reset the invalid state on input change
	};

	const handleEmailInputKeyDown = (e) => {
		if (e.key === "Enter" && emailInput.trim()) {
			addEmail();
		}
	};

	const addEmail = () => {
		const trimmedEmail = emailInput.trim();
		const emailRegex = /\S+@\S+\.\S+/; // Simple email regex for validation

		if (!emailRegex.test(trimmedEmail)) {
			setIsInvalidEmail(true); // Set invalid state if email is not valid
			return;
		}

		if (trimmedEmail && !emails.includes(trimmedEmail)) {
			setEmails([...emails, trimmedEmail]);
		}
		setEmailInput("");
	};

	const removeEmail = (index) => {
		setEmails(emails.filter((_, i) => i !== index));
	};

	const handleSubjectChange = (e) => {
		setSubject(e.target.value);
	};

	const handleSend = async () => {
		// Validate that at least one email is present
		if (emails.length === 0) {
			setIsInvalidEmail(true);
			return;
		}

		const payload = {
			emails,
			subject,
			template: prompt, // Assuming prompt is used as the template
			refreshToken: refreshToken || "",
		};

		try {
			const response = await post("/api/send-email", payload);

			if (response) {
				console.log("Emails sent successfully");
				setEmails([]); // Clear emails after sending
				setSubject(""); // Clear subject after sending
			} else {
				console.error("Failed to send emails");
			}
		} catch (error) {
			console.error("Error sending emails:", error);
		}
	};

	return (
		<div className="bg-white p-2 shadow rounded-md mb-4">
			<h3 className="font-bold mb-1">Compose Email</h3>
			<div
				className={`w-full p-2 mb-2 border rounded-md flex flex-wrap items-center ${
					isInvalidEmail ? "border-red-500" : ""
				}`}
			>
				{emails.map((email, index) => (
					<div key={index} className="flex items-center bg-blue-100 text-blue-600 p-1 rounded-md mr-2 mb-2">
						<span>{email}</span>
						<button onClick={() => removeEmail(index)} className="ml-1 text-red-500">
							&times;
						</button>
					</div>
				))}
				<input
					type="text"
					placeholder="Add email"
					value={emailInput}
					onChange={handleEmailInputChange}
					onKeyDown={handleEmailInputKeyDown}
					className="flex-grow p-1 border-none outline-none"
				/>
				<button onClick={handleSend} className="bg-green-500 text-white py-2 rounded-md ml-2 w-24">
					Send
				</button>
			</div>
			<input
				type="text"
				placeholder="Subject"
				value={subject}
				onChange={handleSubjectChange}
				className="w-full p-2 mb-2 border rounded-md"
			/>
			{/* Display the prompt */}
		</div>
	);
};

export default EmailInbox;
