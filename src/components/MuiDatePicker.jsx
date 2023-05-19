import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import Stack from "@mui/material/Stack";
import { FormControl, TextField } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

const MuiDatePicker = ({
	poll,
	setPoll,
	label,
	name,
	value,
	isEdit,
	editDetails,
	setEditDetails,
}) => {
	const handleChange = (newValue, name) => {
		if (!newValue) return;
		const today = newValue.$d;
		const date =
			today.getFullYear() +
			"-" +
			(today.getMonth() + 1) +
			"-" +
			today.getDate();
		// const time =
		// 	today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		// const dateTime = date + " " + time;

		if (isEdit) {
			setEditDetails({ ...editDetails, [name]: date });
		}
		setPoll({ ...poll, [name]: date });
	};

	return (
		<FormControl margin='normal' fullWidth>
			<LocalizationProvider dateAdapter={ AdapterDayjs }>
				<Stack spacing={ 2 }>
					<DatePicker
						disablePast
						views={ ["day", "month", "year"] }
						localeText
						name={ name }
						defaultValue={ dayjs }
						label={ label }
						value={ value }
						onChange={ (value) => handleChange(value, name) }
						renderInput={ (params) => <TextField { ...params } /> }
						inputFormat='DD-MM-YYYY'
					/>
				</Stack>
			</LocalizationProvider>
		</FormControl>
	);
};

export default MuiDatePicker;
