// LandingPage.jsx
import React from "react";
import { FaEnvelope, FaRocket, FaUserPlus, FaMailBulk } from "react-icons/fa";
import Accordion from "../components/Accordion"; // Import the Accordion component
import "./LandingPage.css"; // Import the CSS file for styling

const LandingPage = () => {
	return (
		<div className="bg-white flex flex-col items-center justify-center relative overflow-hidden">
			<div className="w-full flex justify-between items-center p-4">
				<div className="flex items-center">
					<FaMailBulk className="text-green-600 w-8 h-8 mr-2" />
					<h1 className="text-2xl font-bold text-green-600">No Mail</h1>
				</div>
				<button className="text-blue-600 font-bold hover:underline">Sign Up</button>
			</div>
			<main className="min-h-screen flex flex-col items-center justify-center text-center px-4 z-10">
				<h2 className="text-5xl font-bold mb-6">Welcome to No Mail</h2>
				<p className="text-xl text-gray-700 mb-12">
					Experience the future of email communication with our powerful and intuitive platform.
				</p>

				<button className="gradient-button text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 text-2xl">
					Get Started
				</button>
			</main>
			{/* // In your LandingPage.jsx */}
			<section className="w-full max-w-2xl mx-auto py-12 relative z-20">
				<h3 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h3>
				<Accordion
					title="What is Email Sender Pro?"
					content="Email Sender Pro is a powerful tool that allows you to send emails quickly and efficiently."
				/>
				<Accordion
					title="How do I sign up?"
					content="Click the 'Sign Up' button at the top of the page to create an account."
				/>
				<Accordion
					title="Is there a free trial available?"
					content="Yes, we offer a 14-day free trial for new users."
				/>
				{/* Add more Accordion items as needed */}
			</section>
			<footer className="bg-white shadow w-full py-4 z-10">
				<div className="max-w-7xl mx-auto text-center text-gray-600">
					&copy; 2023 Email Sender Pro. All rights reserved.
				</div>
			</footer>
			{/* Background animation */}
			<div className="absolute inset-0 overflow-hidden">
				{[...Array(6)].map((_, index) => (
					<div key={index} className={`email-icon gradient-${(index % 3) + 1} opacity-10`}></div>
				))}
			</div>
		</div>
	);
};

export default LandingPage;
