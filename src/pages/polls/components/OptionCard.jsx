import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const OptionCard = ({ option, optionImg }) => {
	return option?.map(
		(item, index) => (
			//item.option_image !== null ? (
			<Card sx={{ display: "flex", boxShadow: 1 }} key={index}>
				<Box
					sx={{ display: "flex", flexDirection: "row" }}
					justifyContent='center'
					alignItems='center'>
					{item.option_image !== null && (
						<CardMedia
							component='img'
							sx={{ width: 151, height: 100 }}
							image={`${process.env.REACT_APP_EMS}/${item.option_image}`}
							alt={item.option}
						/>
					)}
					<CardContent sx={{ flex: "1 0 auto" }}>
						<Typography variant='caption'> Option {index + 1}</Typography>
						<Typography variant='body1'>{item.option}</Typography>
					</CardContent>
				</Box>
			</Card>
		)
		// ) : (
		// 	<Typography variant='body1'>{item.option}</Typography>
		// )
	);
};

export default OptionCard;
