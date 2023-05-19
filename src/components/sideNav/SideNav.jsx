import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Ballot, BallotRounded, Person, Poll } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const drawerWidth = 240;
const bgcolor = "#735F32";
const color = "#000";

const SideNav = () => {
	const { access } = useSelector((state) => state.authReducer);

	const menuItems = (access) => {
		const menu = [
			// {
			// 	path: "/",
			// 	icon: <DashboardIcon />,
			// 	linkText: "My Dashboard",
			// },
		];

		if (access?.Admins === true) {
			menu.push({
				path: "/admins",
				icon: <Person />,
				linkText: "Admin Management",
			});
		}

		if (access?.Poll === true) {
			menu.push({
				path: "/polls",
				icon: <Ballot />,
				linkText: "Polls",
			});
		}

		return menu;
	};

	const navigate = useNavigate();
	const handleClick = (path) => {
		navigate(path);
	};
	const drawer = (
		<Box sx={{ overflow: "auto" }}>
			<List>
				{menuItems(access)?.map((item, index) => (
					<ListItem key={index} disablePadding>
						<ListItemButton onClick={() => handleClick(item.path)}>
							<ListItemIcon sx={{ color: color }}>{item.icon}</ListItemIcon>
							<ListItemText primary={item.linkText} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);
	return (
		<Box
			component='nav'
			sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
			aria-label='mailbox folders'>
			<Drawer
				variant='permanent'
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						backgroundColor: bgcolor,
						color: color,
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}>
				<Toolbar />
				{drawer}
			</Drawer>
		</Box>
	);
};

export default SideNav;
