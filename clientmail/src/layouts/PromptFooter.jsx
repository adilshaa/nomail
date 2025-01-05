// PromptFooter.jsx
import React from "react";
import { FaPaperPlane } from "react-icons/fa";

const PromptFooter = ({ prompt, handlePromptChange, sendPrompt }) => {
	return (
		<footer className="absolute bottom-0 left-0 right-0 p-4 flex justify-center">
			<div className="flex items-center bg-white p-2 rounded-md shadow-2xl w-full max-w-2xl mx-4">
				<input
					type="text"
					placeholder="Type your prompt..."
					value={prompt}
					onChange={handlePromptChange}
					className="flex-grow p-2 bg-white border-none outline-none rounded-l-full"
				/>
				<button
					onClick={sendPrompt}
					className="flex items-center justify-center bg-blue-600 text-white p-2 rounded-full ml-2"
				>
					<FaPaperPlane className="w-4 h-4" />
				</button>
			</div>
		</footer>
	);
};

export default PromptFooter;
