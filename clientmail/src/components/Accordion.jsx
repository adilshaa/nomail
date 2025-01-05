// Accordion.jsx
import React, { useState } from "react";

const Accordion = ({ title, content }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleAccordion = () => {
		setIsOpen(!isOpen);
		console.log(isOpen);
	};

	return (
		<div className="border-b border-gray-200">
			<button
				className="w-full text-left py-4 px-6 text-lg font-semibold text-gray-800 hover:bg-gray-100 focus:outline-none"
				onClick={toggleAccordion}
			>
				{title}
			</button>
			{isOpen && <div className="px-6 py-4 text-gray-700">{content}</div>}
		</div>
	);
};

export default Accordion;
