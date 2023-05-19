import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import Stack from "@mui/material/Stack";
import { FormControl, TextField } from "@mui/material";
import dayjs from "dayjs";

const MuiDateTimePicker = ({
	poll,
	setPoll,
	label,
	name,
	isEdit,
	editDetails,
	setEditDetails,
}) => {
	// const { poll, setPoll, label, name } = props

	const handleChange = (newValue) => {
		const today = newValue.$d;
		const date =
			today.getFullYear() +
			"-" +
			(today.getMonth() + 1) +
			"-" +
			today.getDate();
		const time =
			today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		const dateTime = date + " " + time;

		if (isEdit) {
			setEditDetails({ ...editDetails, start_date: dateTime });
		}
		setPoll({ ...poll, start_date: dateTime });
	};
	return (
		<FormControl margin='normal' fullWidth>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Stack spacing={2}>
					<DateTimePicker
						disablePast
						localeText
						name={name}
						defaultValue={dayjs}
						label={label}
						value={poll?.start_date}
						onChange={handleChange}
						renderInput={(params) => <TextField {...params} />}
					/>
				</Stack>
			</LocalizationProvider>
		</FormControl>
	);
};

export default MuiDateTimePicker;
