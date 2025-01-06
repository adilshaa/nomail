import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import arrow icons

const Accordion = ({ title, content, isDarkTheme }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleAccordion = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className={`border-b ${isDarkTheme ? "border-gray-700" : "border-gray-200"}`}>
			<button
				className={`w-full flex justify-between items-center text-left py-4 px-6 text-lg font-semibold ${
					isOpen
						? isDarkTheme
							? "bg-gray-800 text-yellow-500"
							: "bg-yellow-100 text-yellow-700"
						: isDarkTheme
						? "bg-gray-900 text-white"
						: "bg-white text-gray-800"
				}  focus:outline-none`}
				onClick={toggleAccordion}
			>
				<span>{title}</span>
				{isOpen ? (
					<FaChevronUp className={`${isDarkTheme ? "text-yellow-500" : "text-yellow-700"} w-4 h-4`} />
				) : (
					<FaChevronDown className={`${isDarkTheme ? "text-white" : "text-gray-800"} w-4 h-4`} />
				)}
			</button>
			{isOpen && <div className={`px-6 py-4 ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>{content}</div>}
		</div>
	);
};

export default Accordion;
