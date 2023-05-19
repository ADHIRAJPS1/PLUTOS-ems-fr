import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Close } from "@mui/icons-material";
import { Toolbar } from "@mui/material";

const Popup = ({ title, children, openPopup, setOpenPopup, setDetails }) => {
	const handleClosePopup = () => {
		setOpenPopup(false);
		setDetails({});
	};

	return (
		<Dialog
			sx={{ "& .MuiDialog-paper": { width: "55%", maxHeight: 500 } }}
			maxWidth='100'
			open={openPopup}
			onClose={handleClosePopup}>
			<Toolbar>
				<IconButton
					edge='start'
					color='inherit'
					onClick={handleClosePopup}
					aria-label='close'>
					<Close />
				</IconButton>
				<Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
					{title}
				</Typography>
			</Toolbar>
			<DialogContent dividers>{children}</DialogContent>
		</Dialog>
	);
};

export default Popup;
