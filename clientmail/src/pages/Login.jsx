import React, { useState } from "react";
import "./styles.css";
import { post } from "../services/apiService"; // Import the post method
import Cookies from "js-cookie"; // Import js-cookie
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate(); // Hook to programmatically navigate

	useEffect(() => {
		// Check if token exists in cookies
		const token = Cookies.get("token");
		if (token) {
			// Redirect to dashboard if token exists
			navigate("/home/sent");
		}
	}, [navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate input
		if (!email || !password) {
			setError("Email and password are required.");
			return;
		}
		if (!/\S+@\S+\.\S+/.test(email)) {
			setError("Please enter a valid email address.");
			return;
		}

		// Clear previous errors
		setError("");
		try {
			// Make API call to login
			const response = await post("/login", { email, password }, false);
			console.log("Login successful:", response);

			// Store the token and redirect or perform other actions
			Cookies.set("token", response.token, { expires: 7 }); // Set cookie to expire in 7 days
			window.location.href = "/dashboard"; // Redirect to dashboard or another page
		} catch (error) {
			console.error("Login failed:", error);
			setError("Invalid email or password.");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full form-container">
				<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
				{error && <p className="text-red-500 mb-4">{error}</p>}
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
							Email
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Enter your email"
						/>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
							Password
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							placeholder="Enter your password"
						/>
					</div>
					<div className="flex items-center justify-between">
						<button
							type="submit"
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						>
							Sign In
						</button>
						<a
							href="#"
							className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
						>
							Forgot Password?
						</a>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
