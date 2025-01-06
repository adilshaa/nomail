// PromptFooter.jsx
import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon
import '../pages/styles.css'; // Import the CSS file for animations

const PromptFooter = ({ prompt, handlePromptChange, sendPrompt }) => {
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading

  const handleSendClick = async () => {
    if (!prompt.trim()) {
      setIsInputEmpty(true);
      setTimeout(() => setIsInputEmpty(false), 500); // Remove shake effect after animation
    } else {
      setIsInputEmpty(false);
      setIsLoading(true); // Set loading to true
      await sendPrompt();
      setIsLoading(false); // Set loading to false after API call
    }
  };

  return (
    <footer className="absolute bottom-0 left-0 right-0 flex justify-center">
      <div
        className={`flex items-center bg-white p-2 rounded-md shadow-lg w-full max-w-2xl mx-auto ${
          isInputEmpty ? "border border-red-300 shake" : "border border-gray-200"
        }`}
      >
        <input
          type="text"
          placeholder="Type your prompt..."
          value={prompt}
          onChange={(e) => {
            handlePromptChange(e);
            setIsInputEmpty(false); // Reset the error state on input change
          }}
          className="flex-grow p-2 bg-white border-none outline-none rounded-l-full"
        />
        <button
          onClick={handleSendClick}
          className="flex items-center justify-center bg-blue-600 text-white p-2 rounded-full ml-2"
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? (
            <FaSpinner className="w-4 h-4 animate-spin" /> // Spinner icon with animation
          ) : (
            <FaPaperPlane className="w-4 h-4" />
          )}
        </button>
      </div>
    </footer>
  );
};

export default PromptFooter;
