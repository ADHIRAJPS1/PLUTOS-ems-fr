import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import { CardActions, CardContent, Collapse, Typography } from "@mui/material";
import { pink, green, blue, purple, yellow } from "@mui/material/colors";
import { Delete, Edit, ExpandMore } from "@mui/icons-material";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteAdmin } from "../../../redux/actions/admins.action";

const ExpandMoreDetails = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ expand }) => ({
	transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
	marginLeft: "auto",
}));

const getAvatarBgColor = (user_roles) => {
	switch (user_roles) {
		case 1:
			return purple[500];
		case 2:
			return yellow[700];
		case 3:
			return green[500];
		case 4:
			return pink[500];
		case 5:
			return blue[500];
		default:
			return red[500];
	}
};

const AdminCard = ({ user, setUserDetails, setIsEdit, setOpenForm }) => {
	// const { user } = useSelector((state) => state.authReducer);

	// const { user_roleid } = user;
	// console.log("Role id>>>", user_roleid)
	const dispatch = useDispatch();
	const [expanded, setExpanded] = React.useState(false);

	const updateUser = (user) => {
		setIsEdit(true);
		setOpenForm(true);
		setUserDetails(user);
	};

	const deleteUser = (id) => {
		dispatch(deleteAdmin(id));
	};

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Card sx={{ maxWidth: 330 }}>
			<CardHeader
				avatar={
					<Avatar
						sx={{ bgcolor: getAvatarBgColor(user.role_id) }}
						aria-label='recipe'>
						{user.name[0]}
					</Avatar>
				}
				title={user.name}
				subheader={user.client_name}
			/>
			<CardActions disableSpacing>
				<IconButton aria-label='settings' onClick={() => updateUser(user)}>
					<Edit />
				</IconButton>
				<IconButton aria-label='settings' onClick={() => deleteUser(user.id)}>
					<Delete />
				</IconButton>
				<ExpandMoreDetails
					expand={expanded}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label='show more'>
					<ExpandMore />
				</ExpandMoreDetails>
			</CardActions>
			<Collapse in={expanded} timeout='auto' unmountOnExit>
				<CardContent>
					<Typography variant='body2'> {user.email}</Typography>
					<Typography variant='body2'> {user.mobile}</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
};

export default AdminCard;
