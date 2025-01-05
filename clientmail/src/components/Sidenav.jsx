// Sidebar.jsx
import "../pages/styles.css";
import React, { useState, useEffect } from "react";
import {
	FaInbox,
	FaPaperPlane,
	FaFileAlt,
	FaUser,
	FaCog,
	FaCreditCard,
	FaChevronLeft,
	FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Sidebar = ({ selected, setSelected }) => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate(); // Initialize useNavigate

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const closeSidebar = () => {
		setIsOpen(false);
	};

	// Close sidebar when screen size changes to large
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1024) {
				setIsOpen(false);
			}
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleNavigation = (path, section) => {
		setSelected(section);
		navigate(path); // Navigate to the specified path
	};

	return (
		<div>
			{/* Toggle Button for Small Devices */}
			<button onClick={toggleSidebar} className={`lg:hidden fixed top-4 p-2 mt-10 text-black z-50`}>
				{isOpen ? <FaChevronLeft /> : <FaChevronRight />}
			</button>

			{/* Overlay */}
			{isOpen && <div onClick={closeSidebar} className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"></div>}

			{/* Sidebar */}
			<aside
				className={`fixed lg:static top-0 left-0 w-64 h-screen bg-white border-r flex flex-col justify-between overflow-y-auto sidebar-shadow transform ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				} lg:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
			>
				<div>
					<div className="p-4 rounded-md flex items-center">
						<img src="../assets/react.svg" alt="Logo" className="h-10 w-10 mr-2" />
						<h2 className="text-xl font-bold text-green-600">My Mail App</h2>
					</div>
					<ul className="space-y-2 p-4">
						<li>
							<a
								href="#"
								onClick={() => handleNavigation("/home", "Inbox")}
								className={`flex items-center p-2 rounded-md ${
									selected === "Inbox"
										? "bg-blue-100 text-green-600 font-bold"
										: "text-gray-700 hover:bg-gray-200"
								}`}
							>
								<FaInbox className="mr-2" />
								Inbox
							</a>
						</li>
						<li>
							<a
								href="#"
								onClick={() => handleNavigation("/home/sent", "Sent")}
								className={`flex items-center p-2 rounded-md ${
									selected === "Sent"
										? "bg-blue-100 text-green-600 font-bold"
										: "text-gray-700 hover:bg-gray-200"
								}`}
							>
								<FaPaperPlane className="mr-2" />
								Sent
							</a>
						</li>
						<li>
							<a
								href="#"
								onClick={() => handleNavigation("/home/drafts", "Drafts")}
								className={`flex items-center p-2 rounded-md ${
									selected === "Drafts"
										? "bg-blue-100 text-green-600 font-bold"
										: "text-gray-700 hover:bg-gray-200"
								}`}
							>
								<FaFileAlt className="mr-2" />
								Drafts
							</a>
						</li>
						{/* Add more sidebar items here */}
					</ul>
				</div>
				<div className="p-4 border-t">
					<ul className="space-y-2">
						<li>
							<a
								href="#"
								onClick={() => handleNavigation("/home/profile", "Profile")}
								className={`flex items-center p-2 rounded-md ${
									selected === "Profile"
										? "bg-blue-100 text-green-600 font-bold"
										: "text-gray-700 hover:bg-gray-200"
								}`}
							>
								<FaUser className="mr-2" />
								Profile
							</a>
						</li>
						<li>
							<a
								href="#"
								onClick={() => handleNavigation("/home/account-settings", "Account Settings")}
								className={`flex items-center p-2 rounded-md ${
									selected === "Account Settings"
										? "bg-blue-100 text-green-600 font-bold"
										: "text-gray-700 hover:bg-gray-200"
								}`}
							>
								<FaCog className="mr-2" />
								Account Settings
							</a>
						</li>
						<li>
							<a
								href="#"
								onClick={() => handleNavigation("/home/billing", "Billing")}
								className={`flex items-center p-2 rounded-md ${
									selected === "Billing"
										? "bg-blue-100 text-green-600 font-bold"
										: "text-gray-700 hover:bg-gray-200"
								}`}
							>
								<FaCreditCard className="mr-2" />
								Billing
							</a>
						</li>
					</ul>
				</div>
			</aside>
		</div>
	);
};

export default Sidebar;
