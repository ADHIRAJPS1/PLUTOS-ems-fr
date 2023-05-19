import React from "react";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";

import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import SideNav from "../components/sideNav/SideNav";
import Alert from "../components/Alert";
import { Container } from "@mui/system";

const Layout = () => {
	const gridStyle = {
		marginTop: 50,
	};
	return (
		<div className='container'>
			<Header />
			<Grid container direction='row' spacing={4} style={gridStyle}>
				<SideNav />
				<Grid
					item
					//direction='column'
					sm={10}
					justifyContent='center'>
					<Alert />
					<Container>
						<Outlet />
					</Container>
					<Footer />
				</Grid>
			</Grid>
		</div>
	);
};

export default Layout;
