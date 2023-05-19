import { Add } from "@mui/icons-material";
import { Button, Container, Grid, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getColumns, getRows, initFormVals, pollsData } from "./Data";
import { Widget } from "../../components/Widget";
import PollForm from "./components/PollForm";
import Table from "../../components/Table";
import PollPopup from "./components/PollPopup";
import { useDispatch, useSelector } from "react-redux";
import {
	deletePoll,
	getAllPolls,
	updatePoll,
} from "../../redux/actions/polls.action";
import { apicall } from "../../services/api";
import { changeDateFormat } from "../../utils/utilities";
import dayjs from "dayjs";

const Polls = () => {
	const dispatch = useDispatch();
	const { polls } = useSelector((state) => state.pollReducer);
	const { admin } = useSelector((state) => state.authReducer);

	const [openForm, setOpenForm] = useState(false);
	const [openPopup, setOpenPopup] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [pollDetails, setPollDetails] = useState(initFormVals);
	const [editDetails, setEditDetails] = useState();
	const [filePreview, setFilePreview] = useState([]);
	const [categories, setCategories] = useState();
	const [durations, setDurations] = useState();
	const [campaigns, setCampaigns] = useState();
	const [clients, setClients] = useState();
	const [clientId, setClientId] = useState();

	const getCategories = async () => {
		const response = await apicall(`/categories`, "get");
		setCategories(response.data.data);
		return categories;
	};

	const getDuration = async () => {
		const response = await apicall(`/polls/durations`, "get");
		setDurations(response.data.data);
		return durations;
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

	const getAssociatedCamps = async () => {
		let client_id;

		if (admin.role_id === parseInt(process.env.REACT_APP_ADMIN_ROLE_ID)) {
			client_id = clientId;
		} else {
			client_id = admin?.client_id;
		}
		const response = await apicall(
			`/clients/${client_id}/campaigns`,
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
		setCampaigns(response.data.data);
		return campaigns;
	};

	const totalPolls = polls.length;
	const activePolls = polls
		.map((item) => item?.status)
		.filter((item) => item === 1).length;

	const handleOpenForm = () => {
		setOpenForm(true);
		setIsEdit(false);
		setPollDetails({});
		setEditDetails({});
		setFilePreview([]);
	};

	const handleStatusChange = (id, status) => {
		dispatch(updatePoll(id, { status: !status }));
	};

	const handleDelete = (id) => {
		dispatch(deletePoll(id));
	};

	const handleView = (id) => {
		setOpenPopup(true);
		const poll = polls.filter((item) => item.id === id);
		setPollDetails(poll[0]);
	};

	const handleEdit = (id) => {
		setOpenForm(true);
		setIsEdit(true);
		const poll = polls.filter((item) => item.id === id);

		const formDetails = {
			...poll[0],
			start_date: dayjs(poll[0].start_date).format("DD-MM-YYYY"),
			end_date: dayjs(poll[0].end_date).format("DD-MM-YYYY"),
			category: {
				id: poll[0].category[0].id,
				name: poll[0].category[0].name,
			},
			campaign: {
				id: poll[0].campaign_id,
				name: poll[0].campaign_name,
			},
		};
		delete formDetails.campaign_id;
		delete formDetails.campaign_name;

		// formDetails?.poll_option?.map((opt) => {
		// 	return (
		// 		opt.option_image !== null &&
		// 		filePreview.push(`${process.env.REACT_APP_EMS}/${opt.option_image}`)
		// 	);
		// });
		console.log("FormDetails", formDetails)
		setPollDetails(formDetails);
		// setPollDetails(poll[0]);
	};

	useEffect(() => {
		dispatch(getAllPolls());
		getCategories();
		getDuration();
		getAssociatedCamps();
		if (admin?.role_id === 1) {
			getClients();
		}
	}, []);

	useEffect(() => {
		getAssociatedCamps();
	}, [clientId]);
	return (
		<Container>
			<Grid container direction='column' spacing={5}>
				<Grid
					container
					item
					direction='row'
					justifyContent='space-evenly'
					alignItems='center'>
					{pollsData(totalPolls, activePolls).map((data, index) => (
						<Widget
							key={index}
							heading={data.heading}
							icon={data.icon}
							content={data.content}
						/>
					))}
				</Grid>
				<Grid item>
					<Toolbar>
						<Button
							className='button'
							variant='contained'
							disableElevation
							startIcon={<Add />}
							onClick={handleOpenForm}>
							Create new poll
						</Button>
					</Toolbar>
					<Table
						rows={getRows(polls)}
						columns={getColumns(
							handleStatusChange,
							handleView,
							handleEdit,
							handleDelete,
							admin
						)}
						idReq={false}
					/>
				</Grid>
				<PollForm
					openForm={openForm}
					setOpenForm={setOpenForm}
					isEdit={isEdit}
					pollDetails={pollDetails}
					setPollDetails={setPollDetails}
					editDetails={editDetails}
					setEditDetails={setEditDetails}
					categories={categories}
					durations={durations}
					filePreview={filePreview}
					setFilePreview={setFilePreview}
					campaigns={campaigns}
					clients={clients}
					setClientId={setClientId}
					adminRole={admin?.role_id}
				/>
				<PollPopup
					openPopup={openPopup}
					setOpenPopup={setOpenPopup}
					pollDetails={pollDetails}
					setDetails={setPollDetails}
				/>
			</Grid>
		</Container>
	);
};

export default Polls;
