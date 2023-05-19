import { Close } from "@mui/icons-material";
import {
	Alert,
	AppBar,
	Button,
	Dialog,
	IconButton,
	Slide,
	Toolbar,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const Form = ({
	openForm,
	setOpenForm,
	title,
	children,
	setDetails,
	handleSubmit,
	setEditDetails,
}) => {
	const handleCloseForm = () => {
		setOpenForm(false);
		setDetails({});
		setEditDetails({});
	};

	return (
		<Dialog
			fullScreen
			open={openForm}
			onClose={handleCloseForm}
			TransitionComponent={Transition}>
			<AppBar sx={{ position: "relative" }}>
				<Toolbar>
					<IconButton
						edge='start'
						color='inherit'
						onClick={handleCloseForm}
						aria-label='close'>
						<Close />
					</IconButton>
					<Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
						{title}
					</Typography>
					<Button autoFocus color='inherit' onClick={(e) => handleSubmit(e)}>
						save
					</Button>
				</Toolbar>
			</AppBar>
			{children}
		</Dialog>
	);
};

export default Form;
