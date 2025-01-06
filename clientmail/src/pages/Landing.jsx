// LandingPage.jsx
import React, { useState } from "react";
import { FaMailBulk, FaSun, FaMoon } from "react-icons/fa"; // Import sun and moon icons
import Accordion from "../components/Accordion"; // Import the Accordion component
import "./LandingPage.css"; // Import the CSS file for styling
import { FaCheck, FaTimes } from "react-icons/fa"; // Import check and times icons

const LandingPage = () => {
	const [isDarkTheme, setIsDarkTheme] = useState(false);

	const toggleTheme = () => {
		setIsDarkTheme(!isDarkTheme);
	};

	return (
		<div
			className={`${
				isDarkTheme ? "bg-gray-900 text-white" : "bg-white text-gray-900"
			} flex flex-col items-center justify-center relative overflow-hidden`}
		>
			<div className="w-full flex justify-between items-center px-20 py-4">
				<div className="flex items-center">
					<img
						src="https://shreethemes.in/mortal_next/assets/images/logo-icon-40.png"
						alt="Logo Icon"
						className="w-8 h-8 mr-2"
					/>
					<h1 className={`text-2xl font-bold ${isDarkTheme ? "text-yellow-500" : "text-gray-600"}`}>
						Cropmail
					</h1>
				</div>

				<div className="flex space-x-8">
					<a
						href="#price"
						className={`${isDarkTheme ? "text-gray-300" : "text-gray-700"} font-bold hover:underline`}
					>
						Price
					</a>
					<a
						href="#about"
						className={`${isDarkTheme ? "text-gray-300" : "text-gray-700"} font-bold hover:underline`}
					>
						About
					</a>
					<a
						href="#contact"
						className={`${isDarkTheme ? "text-gray-300" : "text-gray-700"} font-bold hover:underline`}
					>
						Contact
					</a>
					<button className={`${isDarkTheme ? "text-blue-400" : "text-blue-600"} font-bold hover:underline`}>
						Sign Up
					</button>
				</div>
				<button
					onClick={toggleTheme}
					className={`ml-4 px-4 py-2 rounded flex items-center ${
						isDarkTheme ? "text-yellow-500" : "text-gray-800"
					}`}
				>
					{isDarkTheme ? <FaSun className="w-5 h-5 rotate" /> : <FaMoon className="w-5 h-5 float" />}
				</button>
			</div>
			<main className="min-h-screen flex flex-col items-center justify-center text-center px-4 z-10">
				<div className="blurred-background"></div>

				<h2 className="text-5xl font-bold mb-6">
					<p className={`${isDarkTheme ? "text-gray-300" : "text-gray-600"}`}>Your Gateway to</p>
					<p className={`block animated-text ${isDarkTheme ? "text-yellow-500" : ""}`}>
						Effortless Email Communication
					</p>
				</h2>
				<p className={`text-lg ${isDarkTheme ? "text-gray-400" : "text-gray-700"} mb-8`}>
					Experience the future of email communication with our powerful and intuitive platform.
				</p>

				{/* Mobile-like card image */}
				<div className="mb-12 w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl z-10">
					<img
						src="https://pagedone.io/block_preview_image/Pricing-plan-13.png" // Replace with your image path
						alt="Mobile Card"
						className="w-full h-auto shadow-lg rounded-lg"
					/>
				</div>

				<button className="gradient-button text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 text-2xl">
					Get Started
				</button>
			</main>
			{/* New Section */}
			<section className="w-full max-w-6xl mx-auto py-12">
				<h3
					className={`text-2xl font-bold ${
						isDarkTheme ? "text-yellow-500" : "text-gray-600"
					} mb-4 text-center`}
				>
					Efficient Email Solutions
				</h3>
				<p className={`text-md ${isDarkTheme ? "text-gray-400" : "text-gray-700"} mb-8 text-center`}>
					Discover how we streamline your email communication with innovative solutions.
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{[...Array(6)].map((_, index) => (
						<div
							key={index}
							className={`${
								isDarkTheme ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
							} border rounded-lg p-12 text-left hover:shadow-lg transition-shadow duration-300 relative overflow-hidden`}
						>
							<div className="absolute inset-0 bg-yellow-500 opacity-0 hover:opacity-20 transition-opacity duration-300 blur-lg"></div>
							<div className="relative z-10">
								<div className="icon mb-4">
									<FaMailBulk className="text-yellow-500 w-8 h-8 hover:scale-110 transition-transform duration-300" />
								</div>
								<h4
									className={`text-xl font-semibold mb-2 ${
										isDarkTheme ? "text-white" : "text-gray-900"
									}`}
								>
									Card Title {index + 1}
								</h4>
								<p className={`${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>
									This is a brief description of the card content.
								</p>
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="w-full max-w-6xl mx-auto py-12">
				<h3
					className={`text-2xl font-bold ${
						isDarkTheme ? "text-yellow-500" : "text-gray-600"
					} mb-4 text-center`}
				>
					Our Pricing Plans
				</h3>
				<p className={`text-md ${isDarkTheme ? "text-gray-400" : "text-gray-400"} mb-8 text-center`}>
					Choose the plan that best suits your needs and start enjoying our services.
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{[
						{
							name: "Free",
							price: "$0",
							period: "year",
							description: "Basic features for personal use.",
							features: [
								{ name: "Basic Support", included: true },
								{ name: "Limited Access", included: true },
								{ name: "Community Access", included: false },
							],
						},
						{
							name: "Professional",
							price: "$49",
							period: "year",
							description: "Advanced features for professionals.",
							features: [
								{ name: "Priority Support", included: true },
								{ name: "Full Access", included: true },
								{ name: "Community Access", included: true },
							],
						},
						{
							name: "Organizations",
							price: "$99",
							period: "year",
							description: "Comprehensive for organizations.",
							features: [
								{ name: "Dedicated Support", included: true },
								{ name: "Unlimited Access", included: true },
								{ name: "Community Access", included: true },
							],
						},
					].map((plan, index) => (
						<div
							key={index}
							className={`${
								isDarkTheme ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
							} border rounded-lg flex flex-col text-left hover:shadow-lg transition-shadow duration-300`}
						>
							<div className="p-8 flex-grow">
								<h4 className="text-[20px] font-semibold mb-2">{plan.name}</h4>
								<p className={`${isDarkTheme ? "text-gray-400" : "text-gray-600"} mb-4`}>
									{plan.description}
								</p>
								<p className="text-4xl font-bold mb-1">{plan.price}</p>
								<p className="text-sm text-gray-500 mb-4">{plan.period}</p>
								{plan.name === "Free" && (
									<button className="bg-transparent text-yellow-500 border border-gray-600 hover:border-yellow-500 py-2 px-4 rounded mb-2 hover:bg-yellow-500 hover:text-white transition-colors">
										Try Free
									</button>
								)}
								{plan.name !== "Free" && (
									<button className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-colors">
										Subscribe Now
									</button>
								)}
							</div>
							<div className={`${isDarkTheme ? "bg-gray-800" : "bg-gray-50"} flex-grow`}>
								<h5
									className={`font-normal ${
										isDarkTheme ? "text-gray-400" : "text-gray-500"
									} px-4 py-2`}
								>
									Features
								</h5>
								<ul className="px-4 pb-4">
									{plan.features.map((feature, idx) => (
										<li key={idx} className="flex items-center mb-1">
											{feature.included ? (
												<FaCheck
													className={`${
														isDarkTheme ? "text-yellow-400" : "text-yellow-500"
													} mr-2`}
												/>
											) : (
												<FaTimes
													className={`${
														isDarkTheme ? "text-gray-500" : "text-gray-400"
													} mr-2`}
												/>
											)}
											<span className={`${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>
												{feature.name}
											</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>
			</section>
			{/* Blurred background colors */}
			<section className="w-full max-w-2xl mx-auto py-12 relative z-20">
				<h3
					className={`text-3xl font-bold text-center mb-6 ${
						isDarkTheme ? "text-yellow-500" : "text-gray-900"
					}`}
				>
					Frequently Asked Questions
				</h3>
				<Accordion
					title="What is Email Sender Pro?"
					content="Email Sender Pro is a powerful tool that allows you to send emails quickly and efficiently."
					isDarkTheme={isDarkTheme}
				/>
				<Accordion
					title="How do I sign up?"
					content="Click the 'Sign Up' button at the top of the page to create an account."
					isDarkTheme={isDarkTheme}
				/>
				<Accordion
					title="Is there a free trial available?"
					content="Yes, we offer a 14-day free trial for new users."
					isDarkTheme={isDarkTheme}
				/>
				{/* Add more Accordion items as needed */}
			</section>

			<footer
				className={`${
					isDarkTheme ? "bg-gray-800 text-gray-400" : "bg-white text-gray-600"
				} shadow w-full py-4 z-10`}
			>
				<div className="max-w-7xl mx-auto text-center">&copy; 2023 Email Sender Pro. All rights reserved.</div>
			</footer>
		</div>
	);
};

export default LandingPage;
