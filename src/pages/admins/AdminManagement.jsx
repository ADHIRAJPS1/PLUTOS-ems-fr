import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Widget } from "../../components/Widget";
import { getAllAdmins } from "../../redux/actions/admins.action";
import { apicall } from "../../services/api";
import AdminCard from "./components/AdminCard";
import AdminForm from "./components/AdminForm";
import { adminTypes, errors, initFormVals } from "./Data";

const AdminManagement = () => {
	const { admins } = useSelector((state) => state.adminReducer);
	const dispatch = useDispatch();

	const [openForm, setOpenForm] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [userDetails, setUserDetails] = useState(initFormVals);
	const [editDetails, setEditDetails] = useState({});
	const [error, setError] = useState(errors);
	const [roles, setRoles] = useState();
	const [clients, setClients] = useState();

	const totalSuperAdmin = admins.filter((user) => user.role_id === 1);
	const totalAdmin = admins.filter((user) => user.role_id === 2);
	const totalCampaignAdmin = admins.filter((user) => user.role_id === 3);

	const handleOpenForm = () => {
		setOpenForm(true);
		setIsEdit(false);
		setUserDetails(initFormVals);
		setError(errors);
		setEditDetails({});
	};

	const getRoles = async () => {
		const response = await apicall(`/admins/roles`, "get");
		setRoles(response.data.data);
		return roles;
	};

	const getClients = async () => {
		const response = await apicall(
			`/clients`,
			"get",
			null,
			{
				headers: {
					"Content-Type": "application/json;charset=UTF-8",
					"Access-Control-Allow-Origin": "*",
				},
			},
			process.env.REACT_APP_CBMS
		);
		setClients(response.data.data);
		return clients;
	};

	useEffect(() => {
		dispatch(getAllAdmins());
		getRoles();
		getClients();
	}, []);

	return (
		<Container>
			{" "}
			<Grid container direction='column' spacing={3}>
				<Grid
					container
					item
					direction='row'
					justifyContent='space-evenly'
					alignItems='center'>
					{adminTypes(totalSuperAdmin, totalAdmin, totalCampaignAdmin).map(
						(admins, index) => (
							<Widget
								key={index}
								heading={admins.heading}
								icon={admins.icon}
								content={admins.content}
							/>
						)
					)}
				</Grid>
				<Grid item>
					<Toolbar>
						<Button
							className='button'
							variant='contained'
							disableElevation
							startIcon={<Add />}
							onClick={handleOpenForm}>
							Create new user
						</Button>
					</Toolbar>
					<Box sx={{ flexGrow: 1 }}>
						<Grid
							item
							container
							direction='row'
							spacing={{ xs: 2, md: 3 }}
							columns={{ xs: 4, sm: 8, md: 12 }}>
							{admins.map((user, index) => {
								return (
									<Grid item xs={2} sm={3} md={3} key={index}>
										<AdminCard
											key={user.user}
											user={user}
											isEdit={isEdit}
											setIsEdit={setIsEdit}
											setOpenForm={setOpenForm}
											setUserDetails={setUserDetails}
										/>
									</Grid>
								);
							})}
						</Grid>
					</Box>
					<AdminForm
						openForm={openForm}
						setOpenForm={setOpenForm}
						isEdit={isEdit}
						userDetails={userDetails}
						setUserDetails={setUserDetails}
						editDetails={editDetails}
						setEditDetails={setEditDetails}
						error={error}
						setError={setError}
						roles={roles}
						clients={clients}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

export default AdminManagement;
