import {
	Chip,
	FormControl,
	InputLabel,
	OutlinedInput,
	Select,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const MultiSelect = ({
	id,
	label,
	name,
	poll,
	setPoll,
	children,
	renderValue,
}) => {
	const [category, setCategory] = useState([]);
	const handleCategoryChange = (event) => {
		const {
			target: { value },
		} = event;
		// setPoll(
		// 	// On autofill we get a stringified value.
		// 	typeof value === "string" ? value.split(",") : value
		// );
	};
	return (
		<FormControl margin='normal' fullWidth required>
			<InputLabel id='demo-multiple-chip-label'>Category</InputLabel>
			<Select
				multiple
				autoFocus
				labelId='demo-multiple-categories-label'
				id={id}
				name={name}
				input={<OutlinedInput id='select-multiple-categories' label={label} />}
				value={poll.category}
				renderValue={renderValue}
				MenuProps={MenuProps}
				onChange={handleCategoryChange}>
				{children}
			</Select>
		</FormControl>
	);
};

export default MultiSelect;
