import { Grid, Typography } from "@mui/material";
import React from "react";
import Popup from "../../../components/Popup";
import OptionCard from "./OptionCard";

const PollPopup = ({ openPopup, setOpenPopup, pollDetails, setDetails }) => {
	return (
		<Popup
			openPopup={openPopup}
			setOpenPopup={setOpenPopup}
			title={pollDetails.poll_name}
			setDetails={setDetails}>
			<Grid
				container
				alignItems='center'
				justifyContent='center'
				//sx={{ border: "1px dashed grey" }}
			>
				<Grid item container alignItems='center' direction='column'>
					<Typography variant='h5' component='block'>
						{pollDetails.question}
					</Typography>
					<Typography variant='subtitle2'>
						Campaign: {pollDetails.campaign_name}
					</Typography>
					<Grid item container justifyContent='space-around' direction='row'>
						<Typography variant='overline'>
							Start Date: {pollDetails.start_date}
						</Typography>
						<Typography variant='overline'>
							{pollDetails?.duration_name}
						</Typography>
						<Typography variant='overline'>
							End Date: {pollDetails.end_date}
						</Typography>
					</Grid>
				</Grid>
				<Grid container item alignItems='center' direction='column' rowGap={ 2 } sx={ { display: "flex", flexWrap: "wrap", justifyContent: "space-around", flexDirection: "row", padding: "1rem" } }>
					<OptionCard option={pollDetails.poll_option} />
				</Grid>
			</Grid>
		</Popup>
	);
};

export default PollPopup;
