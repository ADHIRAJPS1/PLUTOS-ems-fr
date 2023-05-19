import {
	Container,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Radio,
	RadioGroup,
	Select,
	TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../../components/Form";
import MuiDatePicker from "../../../components/MuiDatePicker";
import MuiDateTimePicker from "../../../components/MuiDateTimePicker";
import MultiSelect from "../../../components/MultiSelect";
import { createPoll, updatePoll } from "../../../redux/actions/polls.action";
import PollOptions from "./PollOptions";
import { FormHelperText } from "@mui/material";
import dayjs from "dayjs";
import { changeDateTimeFormat } from "../../../utils/utilities";
// import { durations } from "../Data";

const PollForm = ({
	openForm,
	setOpenForm,
	isEdit,
	pollDetails,
	setPollDetails,
	categories,
	durations,
	filePreview,
	setFilePreview,
	editDetails,
	setEditDetails,
	campaigns,
	clients,
	setClientId,
	adminRole,
}) => {
	const dispatch = useDispatch();
	const [activeError, setActiveError] = useState(false);
	const [optionError, setOptionError] = useState("");
	const [pollClientId, setPollClientId] = useState("");
	const [pollClientName, setPollClientName] = useState("");

	// const handleCategoryChange = (event) => {
	// 	const {
	// 		target: { value },
	// 	} = event;

	// 	setCategory(
	// 		// On autofill we get a stringified value.
	// 		typeof value === "string" ? value.split(",") : value
	// 	);
	// 	setPoll({
	// 		...poll,
	// 		category: value,
	// 	});
	// };

	// console.log("::",pollDetails);

	// const validateForm=()=>{
	// 	console.log("::",pollDetails);
	// 	if(!pollDetails.poll_name||pollDetails.poll_name==""){
	// 		 poll_name:{ err: true, errText: "Please enter poll name." }
	// 	}
	// 	else{

	// 	}
	// }

	useEffect(() => {
		if (!openForm) {
			setActiveError(false);
		}
		if (isEdit) {
			// console.log("edit me");
			setPollClientId(pollDetails.client_id);
			setPollClientName(pollDetails.client_name);
		}
		// console.log("PollDetails", pollDetails);
		// console.log("Clients", setClientId)
	}, [openForm]);

	function checkOptionValidate() {
		let message = "";
		if (!pollDetails.options && !filePreview.length > 0) {
			message = "Options are required";
			return message;
		}
		if (!pollDetails.options && filePreview.length > 0) {
			message = "Please enter text for these images";
			return message;
		} else if (pollDetails.options?.length < 2) {
			message = "Please enter atleast two options";
			return message;
		} else if (filePreview && filePreview?.length > 0) {
			let data =
				filePreview.length > pollDetails.options.length
					? filePreview
					: pollDetails.options;
			for (let i = 0; i < data.length; i++) {
				if (!(pollDetails.options[i] && filePreview[i])) {
					message =
						"Please enter a valid set of option texts and their respective images";
					return message;
				}
			}
		}
	}

	const formValidate = () => {
		if (
			!(!pollDetails.poll_name || pollDetails.poll_name === "") &&
			!(!pollDetails.category_id || pollDetails.category_id === "") &&
			!(!pollDetails.campaign_id || pollDetails.campaign_id === "") &&
			!(!pollDetails.campaign_name || pollDetails.campaign_name === "") &&
			// !(!pollDetails.start_date || pollDetails.start_date === "") &&
			!(!pollDetails.question || pollDetails.question === "") &&
			!checkOptionValidate()
		) {
			return true;
		} else {
			return false;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const pollData = new FormData();
		if (!isEdit) {
			const today = dayjs().$d;
			const date =
				today.getFullYear() +
				"-" +
				(today.getMonth() + 1) +
				"-" +
				today.getDate();
			if (!pollDetails.start_date) pollDetails.start_date = date;
			if (!pollDetails.duration_id) pollDetails.duration_id = 1;
			setActiveError(true);
			let alertdata = checkOptionValidate();
			if (alertdata) {
				setOptionError(alertdata);
			} else {
				setOptionError("");
			}
			if (formValidate()) {
				pollData.append("activity_id", "1");
				for (let value in pollDetails) {
					if (value === "options") {
						pollDetails.options.map((opt, index) =>
							pollData.append("option_name[]", opt)
						);
					} else {
						pollData.append(value, pollDetails[value]);
					}
				}

				dispatch(createPoll(pollData));
				setOpenForm(false);
				setPollDetails({});
				setEditDetails({});
				setOptionError("");
				setActiveError(false);
			}
		} else {
			const editDetailsLength = Object.keys(editDetails).length;
			if (!editDetailsLength) {
				setOpenForm(false);
				setPollDetails({});
				setEditDetails({});
				setOptionError("");
				setActiveError(false);
				return;
			}
			for (let value in editDetails) {
				if (value === "poll_option") {
					editDetails?.poll_option?.map((opt, index) => {
						delete opt.total_users;
						return pollData.append("poll_option[]", JSON.stringify(opt))
					}
					);
				} else {
					pollData.append(value, editDetails[value]);
				}
			}
			dispatch(updatePoll(pollDetails.id, pollData));
			setOpenForm(false);
			setPollDetails({});
			setEditDetails({});
			setOptionError("");
			setActiveError(false);
		}
	};

	const handleInputChange = (e, campaign) => {
		const { name, value } = e.target;

		if (!isEdit) {
			if (name === "campaign") {
				setPollDetails({
					...pollDetails,
					campaign_id: value.campaign_id,
					campaign_name: value.name,
				});
			} else {
				setPollDetails({ ...pollDetails, [name]: value });
			}
		} else {
			if (name === "campaign") {
				setPollDetails({
					...pollDetails,
					campaign_id: value.campaign_id,
					campaign_name: value.name,
				});
				setEditDetails({
					...editDetails,
					campaign_id: value.campaign_id,
					campaign_name: value.name,
				});
			} else {
				setPollDetails({ ...pollDetails, [name]: value });
				setEditDetails({ ...editDetails, [name]: value });
			}
		}
	};

	const handleClientChange = (e) => {
		const { name, value } = e.target;
		const client = clients.filter((client) => client.client_id === value);
		const key = "client_name";
		setPollDetails({ ...pollDetails, [name]: value, [key]: client[0].name });
		setClientId(value);
	};

	return (
		<Form
			openForm={ openForm }
			setOpenForm={ setOpenForm }
			title={ !isEdit ? "Create new poll" : "Update poll" }
			setDetails={ setPollDetails }
			handleSubmit={ handleSubmit }
			setEditDetails={ setEditDetails }>
			<Container>
				<Grid container spacing={ 2 } key='form' component='form'>
					<Grid item xs={ 6 }>
						<TextField
							margin='normal'
							required
							fullWidth
							id='poll_name'
							label='Poll Name'
							name='poll_name'
							value={ pollDetails?.poll_name }
							onChange={ handleInputChange }
							autoFocus
							error={
								activeError &&
								(!pollDetails.poll_name || pollDetails.poll_name === "")
							}
							helperText={
								activeError &&
								(!pollDetails.poll_name || pollDetails.poll_name === "") &&
								"Poll name is required"
							}
						/>
						{ adminRole === parseInt(process.env.REACT_APP_ADMIN_ROLE_ID) && (
							<TextField
								select
								margin='normal'
								required
								fullWidth
								id='client'
								label='Client'
								name='client_id'
								onChange={ handleClientChange }
								error={
									activeError &&
									(!pollDetails.campaign_id || pollDetails.campaign_id === "")
								}
								// SelectProps={ {
								// 	renderValue: () => pollDetails.client_id
								// }
								// }
								// value={ pollDetails.client_id }
								// defaultValue={ pollDetails.client_id }
								helperText={
									activeError &&
									(!pollDetails.campaign_id ||
										pollDetails.campaign_id === "") &&
									"Please select client name"
								}>
								{ clients?.map((option) => (
									<MenuItem key={ option.name } value={ option.client_id }>
										{ option.name }
									</MenuItem>
								)) }
							</TextField>
						) }
						<TextField
							select
							margin='normal'
							required
							fullWidth
							id='campaign'
							label='Campaign'
							name='campaign'
							// value={pollDetails?.campaign?.id}
							onChange={ handleInputChange }
							// value={pollDetails?.campaign?.name}
							selectProps={ {
								renderValue: () => pollDetails?.campaign?.id
							} }
							error={
								activeError &&
								(!pollDetails.campaign_name || pollDetails.campaign_name === "")
							}
							helperText={
								activeError &&
								(!pollDetails.campaign_name ||
									pollDetails.campaign_name === "") &&
								"Please select campaign name"
							}>
							{ campaigns?.map((option) => (
								<MenuItem key={ option.name } value={ option }>
									{ option.name }
								</MenuItem>
							)) }
						</TextField>
						<TextField
							select
							margin='normal'
							required
							fullWidth
							id='category'
							label='Category'
							name='category_id'
							value={ pollDetails?.category?.id }
							onChange={ handleInputChange }
							error={
								activeError &&
								(!pollDetails.category_id || pollDetails.category_id === "")
							}
							helperText={
								activeError &&
								(!pollDetails.category_id || pollDetails.category_id === "") &&
								"Please select a category for this poll"
							}>
							{ categories?.map((option) => (
								<MenuItem key={ option.name } value={ option.id }>
									{ option.name }
								</MenuItem>
							)) }
						</TextField>
						{/* <FormControl margin='normal' fullWidth required>
							<InputLabel id='demo-multiple-chip-label'>Category</InputLabel>
							<Select
								multiple
								labelId='demo-multiple-categories-label'
								id='category'
								input={
									<OutlinedInput
										id='select-multiple-categories'
										label='Category'
									/>
								}
								name='category'
								value={category}
								renderValue={(selected) => (
									<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
										{selected.map((value, index) => (
											<Chip key={value} label={value} />
										))}
									</Box>

									// <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
									// 	{selected.map((value, index) => (
									// 		<Chip key={value.id} label={value.name} />
									// 	))}
									// </Box>
								)}
								MenuProps={MenuProps}
								onChange={handleCategoryChange}>
								{categories.map((option) => (
									<MenuItem
										key={option.id}
										value={
											// { id: option.id, name: option.name }
											option.id
										}>
										{option.id}. {option.name}
									</MenuItem>
								))}
							</Select>
						</FormControl> */}
						<FormControl margin='normal' fullWidth required>
							<FormLabel id='duration_id'>Duration</FormLabel>
							<RadioGroup
								row
								aria-labelledby='duration_id'
								name='duration_id'
								value={ pollDetails?.duration_id || 1 }
								onChange={ handleInputChange }>
								{ durations?.map((option) => (
									<FormControlLabel
										key={ option.id }
										value={ option.id }
										control={ <Radio /> }
										label={ option.duration }
									/>
								)) }
							</RadioGroup>
							{ activeError &&
								(!pollDetails.duration_id ||
									pollDetails.duration_id === "") && (
									<FormHelperText sx={ { color: "red" } }>
										Please select the duration of this poll.
									</FormHelperText>
								) }
						</FormControl>
						<MuiDatePicker
							poll={ pollDetails }
							setPoll={ setPollDetails }
							isEdit={ isEdit }
							setEditDetails={ setEditDetails }
							editDetails={ editDetails }
							value={
								// isEdit
								// 	? dayjs(pollDetails?.start_date, "DD-MM-YYYY HH:mm:ss")
								// 	:
								dayjs(pollDetails?.start_date)
							}
							name='start_date'
							label='Start Date'
						/>
						{ activeError &&
							(!pollDetails.start_date || pollDetails.start_date === "") && (
								<FormHelperText sx={ { color: "red" } }>
									Please select start date.
								</FormHelperText>
							) }

						{ pollDetails?.duration_id === "2" && (
							<MuiDatePicker
								poll={ pollDetails }
								setPoll={ setPollDetails }
								isEdit={ isEdit }
								setEditDetails={ setEditDetails }
								editDetails={ editDetails }
								value={
									// isEdit ?
									dayjs(pollDetails?.end_date)
									// 	:
									// dayjs(pollDetails?.end_date, "DD-MM-YYYY")
								}
								name='end_date'
								label='End Date'
							/>
						) }
					</Grid>
					<Grid item xs={ 6 }>
						<TextField
							margin='normal'
							required
							fullWidth
							id='question'
							label='Question'
							name='question'
							value={ pollDetails?.question }
							onChange={ handleInputChange }
							autoComplete='email'
							error={
								activeError &&
								(!pollDetails.question || pollDetails.question === "")
							}
							helperText={
								activeError &&
								(!pollDetails.question || pollDetails.question === "") &&
								"Question is required"
							}
						/>
						{ activeError && optionError && (
							<FormHelperText sx={ { color: "red" } }>
								{ optionError }
							</FormHelperText>
						) }
						<PollOptions
							pollDetails={ pollDetails }
							setPollDetails={ setPollDetails }
							editDetails={ editDetails }
							setEditDetails={ setEditDetails }
							isEdit={ isEdit }
							filePreview={ filePreview }
							setFilePreview={ setFilePreview }
						/>
					</Grid>
				</Grid>
			</Container>
		</Form>
	);
};

export default PollForm;
