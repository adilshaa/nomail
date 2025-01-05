import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import LandingPage from "./pages/Landing";
import Sent from "../src/pages/Sent";
import Profile from "../src/pages/Profile";

const PrivateRoute = React.lazy(() => import("./components/PrivateRoute"));

function App() {
	return (
		<Router>
			<div className="App">
				<Suspense fallback={<div>Loading...</div>}>
					<Routes>
						{/* Default Route */}
						<Route path="/login" element={<LoginPage />} />
						{/* Redirect from / to /home/sent */}
						<Route path="/" element={<Navigate to="/home/sent" />} />
						{/* Private Routes */}
						<Route path="/home" element={<PrivateRoute element={Home} />}>
							<Route path="land" element={<LandingPage />} />
							<Route path="sent" element={<Sent />} />
							<Route path="profile" element={<Profile />} />
						</Route>
						<Route path="/*" element={<LandingPage />} /> {/* Use wildcard for nested routes */}
					</Routes>
				</Suspense>
			</div>
		</Router>
	);
}

export default App;
