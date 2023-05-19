import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	const { isAuthenticated, access } = useSelector((state) => state.authReducer);

	if (!isAuthenticated) {
		return <Navigate to='/login' />;
	}

	if (children.type.name === "AdminManagement" && access?.Admins !== true) {
		return <Navigate to='/unauthorized' />;
	}
	if (children.type.name === "Polls" && access?.Poll !== true) {
		return <Navigate to='/unauthorized' />;
	}
	return children;
};

export default PrivateRoute;
