import { AccountCircle, Logout } from "@mui/icons-material";
import {
	AppBar,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/auth.actions";

const Header = () => {
	const { isAuthenticated, loading, admin } = useSelector(
		(state) => state.authReducer
	);
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClick = () => {
		dispatch(logout());
		navigate("/login");
	};
	const authLinks = (
		<div>
			<IconButton
				size='large'
				aria-label='account of current admin'
				aria-controls='menu-appbar'
				aria-haspopup='true'
				onClick={handleMenu}
				color='inherit'>
				<AccountCircle />
			</IconButton>
			<Menu
				id='menu-appbar'
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={Boolean(anchorEl)}
				onClose={handleClose}>
				<MenuItem onClick={handleClose}>
					<Typography variant='overline' component='div'>
						Hello {admin && admin.name}
					</Typography>
				</MenuItem>
				<MenuItem onClick={handleClick}>Logout</MenuItem>
			</Menu>
		</div>
	);
	return (
		<AppBar
			position='fixed'
			sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
			<Toolbar>
				<Typography
					variant='h6'
					noWrap
					component='a'
					href='/'
					sx={{
						fontFamily: "Comfortaa",
						fontSize: "1.5vw",
						color: "#f9f7f7",
						display: { xs: "none", md: "flex" },
						fontWeight: 700,
						textDecoration: "none",
					}}>
					plutosONE
				</Typography>
				<Typography
					sx={{ ml: "34%", mt: 1, flex: 1, color: "#f9f7f7" }}
					noWrap
					variant='overline'
					component='div'>
					Engagement Management System
				</Typography>
				<Fragment>{isAuthenticated && authLinks}</Fragment>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
