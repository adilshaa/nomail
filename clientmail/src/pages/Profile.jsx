import React, { useEffect } from "react";
import Cookies from "js-cookie";

const Profile = ({ user }) => {
	user = {
		name: "John Doe",
		email: "john.doe@example.com",
		profilePicture: "https://via.placeholder.com/150",
	};

	useEffect(() => {
		// Extract tokens from URL
		const params = new URLSearchParams(window.location.search);
		const refreshToken = params.get("refreshToken");
		const accessToken = params.get("accessToken");

		// Store tokens in cookies if available
		if (refreshToken) {
			Cookies.set("refreshToken", refreshToken, { secure: true, sameSite: "Strict" });
		}
		if (accessToken) {
			Cookies.set("accessToken", accessToken, { secure: true, sameSite: "Strict" });
		}
	}, []);

	const handleSignIn = async () => {
		try {
			const response = await fetch("http://localhost:4000/api/auth");
			const data = await response.json();
			window.location.href = data.url; // Redirect to Google OAuth URL
		} catch (error) {
			console.error("Error initiating OAuth flow", error);
		}
	};

	return (
		<div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
			<div className="flex items-center justify-center p-4">
				<img src={user.profilePicture} alt="Profile" className="h-24 w-24 rounded-full object-cover" />
			</div>
			<div className="flex items-center justify-center mb-4">
				<button
					onClick={handleSignIn}
					className="border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition-colors duration-300"
				>
					Sign In
				</button>
			</div>
			<div className="p-4">
				<div className="bg-gray-100 p-4 rounded-md mb-4">
					<h2 className="text-xl font-bold text-center text-gray-800">{user.name}</h2>
				</div>
				<div className="bg-gray-100 p-4 rounded-md">
					<p className="text-center text-gray-600">{user.email}</p>
				</div>
			</div>
		</div>
	);
};

export default Profile;
