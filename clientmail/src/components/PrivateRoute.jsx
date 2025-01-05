// client/src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ element: Component, ...rest }) => {
	const token = Cookies.get("token"); // Replace 'token' with your actual cookie name

	return token ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
