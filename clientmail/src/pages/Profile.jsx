import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { FaEdit } from "react-icons/fa"; // Import the edit icon

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
    <div className="w-full px-2 py-2">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex items-center p-6">
          <img src={user.profilePicture} alt="Profile" className="h-24 w-24 rounded-full object-cover mr-6" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <button className="ml-auto text-blue-500 hover:text-blue-700 transition-colors duration-300">
            <FaEdit size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
