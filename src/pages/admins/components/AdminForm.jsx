import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	OutlinedInput,
	TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Form from "../../../components/Form";
import { createAdmin, updateAdmin } from "../../../redux/actions/admins.action";
import { initFormVals } from "../Data";

const AdminForm = ({
	openForm,
	setOpenForm,
	isEdit,
	userDetails,
	setUserDetails,
	editDetails,
	setEditDetails,
	error,
	setError,
	roles,
	clients,
}) => {
	const dispatch = useDispatch();

	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		if (!isEdit) {
			if (name === "client_id") {
				setUserDetails({
					...userDetails,
					client_id: value.client_id,
					client_name: value.name,
				});
			} else {
				setUserDetails({ ...userDetails, [name]: value });
			}
		} else {
			if (name === "client_id") {
				setUserDetails({
					...userDetails,
					client_id: value.client_id,
					client_name: value.name,
				});
				setEditDetails({
					...editDetails,
					client_id: value.client_id,
					client_name: value.name,
				});
			} else {
				setUserDetails({ ...userDetails, [name]: value });
				setEditDetails({ ...editDetails, [name]: value });
			}
		}
	};

	const handleError = (field, value) => {
		if (field === "name") {
			if (value.length < 1 || !value) {
				return { err: true, errText: "Please enter full name." };
			}
		}
		if (field === "email") {
			if (value.length < 1 || !value) {
				return { err: true, errText: "Please enter a valid email." };
			}
		}
		if (field === "mobile") {
			if (value.length !== 10 || !value) {
				return {
					err: true,
					errText: "Mobile number should be of 10 digits.",
				};
			}
		}
		if (field === "password") {
			if (value.length < 6 || !value) {
				return {
					err: true,
					errText: "Password should be of minimun 6 characters.",
				};
			}
		}
		if (field === "role_id") {
			if (value.length < 1 || !value) {
				return { err: true, errText: "Role is required." };
			}
		}
		if (field === "client_id") {
			if (value.length < 1 || !value) {
				return { err: true, errText: "Client name is required." };
			}
		}
	};

	const validateForm = () => {
		const errArr = Object.keys(userDetails).map((key, index) => {
			const val = handleError(key, userDetails[key]);
			return !val
				? [
						[key],
						{
							err: false,
							errText: "",
						},
				  ]
				: [[key], val];
		});

		const errObj = Object.fromEntries(errArr);
		const validate =
			!errObj.name.err &&
			!errObj.email.err &&
			!errObj.password.err &&
			!errObj.role_id.err &&
			!errObj.client_id.err &&
			!errObj.mobile.err;
		setError(errObj);
		return validate;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const isValid = validateForm();

		if (!isEdit) {
			if (isValid) {
				dispatch(createAdmin(userDetails));
				setOpenForm(false);
				setUserDetails(initFormVals);
				setEditDetails({});
			}
		} else {
			dispatch(updateAdmin(userDetails.id, editDetails));
			setOpenForm(false);
			setUserDetails(initFormVals);
			setEditDetails({});
		}
	};

	return (
		<Form
			openForm={openForm}
			setOpenForm={setOpenForm}
			title={!isEdit ? "Create new admin" : "Update admin details"}
			setDetails={setUserDetails}
			handleSubmit={handleSubmit}
			setEditDetails={setEditDetails}>
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
				component='form'>
				<FormControl sx={{ width: 400 }}>
					<TextField
						margin='normal'
						required
						fullWidth
						id='name'
						label='Full Name'
						name='name'
						error={error?.name?.err}
						helperText={error?.name?.err && error.name.errText}
						value={userDetails.name}
						onChange={handleInputChange}
						autoFocus
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email Address'
						name='email'
						error={error.email.err}
						helperText={error.email.err && error.email.errText}
						value={userDetails.email}
						onChange={handleInputChange}
						autoComplete='email'
						autoFocus
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						id='mobile'
						label='Contact no.'
						name='mobile'
						error={error.mobile.err}
						helperText={error.mobile.err && error.mobile.errText}
						value={userDetails.mobile}
						onChange={handleInputChange}
						autoFocus
					/>
					<FormControl sx={{ mt: 1.5 }} variant='outlined'>
						<InputLabel htmlFor='outlined-adornment-password' required>
							Password
						</InputLabel>
						<OutlinedInput
							id='outlined-adornment-password'
							type={showPassword ? "text" : "password"}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={handleClickShowPassword}
										edge='end'>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label='Password'
							name='password'
							error={error.password.err}
							helperText={error.password.err && error.password.errText}
							value={userDetails.password}
							onChange={handleInputChange}
						/>
					</FormControl>
					<TextField
						select
						margin='normal'
						required
						fullWidth
						id='roles'
						label='Role'
						name='role_id'
						error={error.role_id.err}
						helperText={error.role_id.err && error.role_id.errText}
						autoFocus
						defaultValue=''
						value={userDetails.role_id}
						onChange={handleInputChange}>
						{roles?.map((option) => (
							<MenuItem key={option.role} value={parseInt(option.id)}>
								{option.role}
							</MenuItem>
						))}
					</TextField>
					<TextField
						// disabled={
						// 	(userDetails.role_id === 1 || userDetails.role_id === 2) && true
						// }
						select
						margin='normal'
						required
						fullWidth
						id='client'
						label='Client Name'
						name='client_id'
						error={error.client_id.err}
						helperText={error.client_id.err && error.client_id.errText}
						value={userDetails.client_id}
						onChange={handleInputChange}
						autoFocus>
						{clients?.map((option) => (
							<MenuItem key={option.name} value={option}>
								{option.name}
							</MenuItem>
						))}
					</TextField>
				</FormControl>
			</Box>
		</Form>
	);
};

export default AdminForm;
