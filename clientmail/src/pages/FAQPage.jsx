// FAQPage.jsx
import React from "react";
import Accordion from "../components/Accordion"; // Adjust the import path as necessary

const FAQPage = () => {
	return (
		<div className="min-h-screen bg-white flex flex-col items-center justify-center py-12">
			<h2 className="text-4xl font-bold mb-8">Frequently Asked Questions</h2>
			<div className="w-full max-w-2xl mx-auto">
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
			</div>
		</div>
	);
};

export default FAQPage;
