import { Container } from "@mui/system";
import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<Container>
			<Typography variant='h3' gutterBottom>
				<ErrorIcon /> Page Not Found
			</Typography>
			<Typography variant='h6' gutterBottom>
				Sorry, this page does not exist.
			</Typography>
			<Link component='button' variant='body2' onClick={navigate("/login")}>
				Go back to login page
			</Link>
		</Container>
	);
};

export default NotFound;
