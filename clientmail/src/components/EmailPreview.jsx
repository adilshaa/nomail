// EmailPreview.jsx
import React, { useState, useEffect } from "react";
import { FaEye, FaCode } from "react-icons/fa";
import Editor from "@monaco-editor/react";

const EmailPreview = ({ apiResponse, onContentChange }) => {
	const [activeTab, setActiveTab] = useState("preview");
	const [htmlContent, setHtmlContent] = useState(`
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: auto;
          background: white;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333;
        }
        p {
          color: #666;
          line-height: 1.5;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #28a745;
          color: white;
          text-decoration: none;
          border-radius: 5px;
        }
        .footer {
          margin-top: 20px;
          text-align: center;
          font-size: 12px;
          color: #999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to Our Monthly Update!</h1>
        <p>Dear Valued Partner,</p>
        <p>We are excited to share our latest insights and updates with you. Our team has been working diligently to drive innovation and enhance our services, ensuring you receive the best experience possible.</p>
        <p>This month, we rolled out several improvements that aim to streamline our processes and provide you with more value:</p>
        <ul>
          <li>New feature launch: Stay tuned for our upcoming products!</li>
          <li>Webinar series: Join us for informative sessions every week.</li>
          <li>Customer feedback initiatives: Your input is invaluable to us.</li>
        </ul>
        <p>For more details, click the button below:</p>
        <a href="#" class="button">Learn More</a>
        <p>Thank you for your continued partnership. We look forward to achieving great things together!</p>
        <p>Best regards,<br>Your Company Name</p>
        <div class="footer">
          <p>123 Business Road, Business City, BC 12345 | <a href="mailto:info@yourcompany.com">info@yourcompany.com</a></p>
        </div>
      </div>
    </body>
    </html>
  `);

	useEffect(() => {
		if (apiResponse) {
			// Update the htmlContent with the API response
			console.log("API Response:", apiResponse);
			setHtmlContent(apiResponse?.code || htmlContent);
		}
	}, [apiResponse]);

	const handleEditorChange = (value) => {
		setHtmlContent(value);
		if (onContentChange) {
			onContentChange(value); // Emit changes to the parent
		}
	};

	return (
		<div className="bg-gray-50 p-4 rounded relative">
			<h4 className="font-bold mb-2">AI-Generated Email Preview</h4>
			<p className="text-gray-700">This is a preview of the email generated by AI...</p>

			<div className="absolute top-4 right-4 flex space-x-2">
				<button
					className={`p-2 rounded-full ${activeTab === "preview" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
					onClick={() => setActiveTab("preview")}
				>
					<FaEye />
				</button>
				<button
					className={`p-2 rounded-full ${activeTab === "source" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
					onClick={() => setActiveTab("source")}
				>
					<FaCode />
				</button>
			</div>

			<div className="mt-4" style={{ height: "500px" }}>
				{activeTab === "preview" ? (
					<iframe srcDoc={htmlContent} title="Email Preview" className="w-full h-full border"></iframe>
				) : (
					<Editor
						height="100%"
						defaultLanguage="html"
						value={htmlContent}
						onChange={handleEditorChange}
						theme="light" // Set the theme to light for a white background
					/>
				)}
			</div>
		</div>
	);
};

export default EmailPreview;
