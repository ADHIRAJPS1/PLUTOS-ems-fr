import { Container } from "@mui/system";
import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Unauthorized = () => {
	const navigate = useNavigate();
	return (
		<Container>
			<Typography variant='h3' gutterBottom>
				<ErrorIcon /> Unauthorized user
			</Typography>
			<Typography variant='h6' gutterBottom>
				You don't have access to this page.
			</Typography>
			<Link component='button' variant='body2' onClick={navigate("/login")}>
				Go back to login page
			</Link>
		</Container>
	);
};

export default Unauthorized;
