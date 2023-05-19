import {
	Ballot,
	BallotRounded,
	Delete,
	Edit,
	Poll,
	Visibility,
} from "@mui/icons-material";
import { IconButton, Switch, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

export const polls = [
	{
		id: "aabf26b8-dd3c-4d47-a271-7b41d52ca946",
		activity_id: "62d5dd24-55d3-4a4c-8ee2-ff64dcae19b8",
		poll_name: "India's capital",
		campaign_id: "1",
		campaign_name: "NBT200",
		question: "Which of the following is the capital of India?",
		duration_id: 1,
		image: null,
		start_date: "2023-03-06 12:43:00",
		end_date: null,
		created_by: "7641309d-41af-4668-bc24-e815958fa179",
		modified_by: "7641309d-41af-4668-bc24-e815958fa179",
		created_at: "2023-03-06 12:43:00",
		modified_at: "2023-03-06 12:43:00",
		status: true,
		is_deleted: 0,
		category: [],
		poll_option: [
			{
				id: "81da85dd-5ab9-49ee-a0dc-bf622b6fe52f",
				option: "Delhi",
				option_image: null,
				poll_id: "aabf26b8-dd3c-4d47-a271-7b41d52ca946",
				is_deleted: false,
				created_at: "2023-03-06 12:43:00",
				modified_at: "2023-03-06 12:43:00",
			},
			{
				id: "0efb88c1-2f57-4f88-9cfe-e6994e46f2c5",
				option: "Mumbai",
				option_image: null,
				poll_id: "aabf26b8-dd3c-4d47-a271-7b41d52ca946",
				is_deleted: false,
				created_at: "2023-03-06 12:43:00",
				modified_at: "2023-03-06 12:43:00",
			},
		],
	},
	{
		id: "qabf26b8-dd3c-4d47-a271-7b41d52ca946",
		activity_id: "22d5dd24-55d3-4a4c-8ee2-ff64dcae19b8",
		poll_name: "Fav fruit",
		campaign_id: "3",
		campaign_name: "NBT-English",
		question: "What's your favourite fruit?",
		duration_id: 2,
		image: null,
		start_date: "2023-03-06 12:43:00",
		end_date: null,
		created_by: "7641309d-41af-4668-bc24-e815958fa179",
		modified_by: "7641309d-41af-4668-bc24-e815958fa179",
		created_at: "2023-03-06 12:43:00",
		modified_at: "2023-03-06 12:43:00",
		status: false,
		is_deleted: 0,
		category: [],
		poll_option: [
			{
				id: "81da85dd-5ab9-49ee-a0dc-bf622b6fe52f",
				option: "Apple",
				option_image: "storage/poll_images/2023-03-061001_skinchicken.jpg",
				poll_id: "aabf26b8-dd3c-4d47-a271-7b41d52ca946",
				is_deleted: false,
				created_at: "2023-03-06 12:43:00",
				modified_at: "2023-03-06 12:43:00",
			},
			{
				id: "0efb88c1-2f57-4f88-9cfe-e6994e46f2c5",
				option: "Mango",
				option_image: "storage/poll_images/2023-03-06Food-Web-Banner-18.jpg",
				poll_id: "aabf26b8-dd3c-4d47-a271-7b41d52ca946",
				is_deleted: false,
				created_at: "2023-03-06 12:43:00",
				modified_at: "2023-03-06 12:43:00",
			},
			{
				id: "4efb88c1-2f57-4f88-9cfe-e6994e46f2c5",
				option: "Banana",
				option_image: "storage/poll_images/2023-03-06Food-Web-Banner-18.jpg",
				poll_id: "aabf26b8-dd3c-4d47-a271-7b41d52ca946",
				is_deleted: false,
				created_at: "2023-03-06 12:43:00",
				modified_at: "2023-03-06 12:43:00",
			},
		],
	},
];

export const initFormVals = {
	activity: "1",
	poll_name: "",
	campaign_id: "",
	campaign_name: "",
	question: "",
	duration_id: "",
	start_date: dayjs(),
	option_name: [],
};

export const initFileVals = {
	preview: "",
	data: "",
};

export const pollsData = (totalPolls, activePolls) => [
	{
		heading: "Total Polls",
		icon: <Ballot fontSize='large' color='secondary' />,
		content: totalPolls,
	},
	{
		heading: "Active Polls",
		icon: <Ballot fontSize='large' color='success' />,
		content: activePolls,
	},
];

export const campaigns = [
	{
		id: "1",
		name: "NBT200",
	},
	{
		id: "2",
		name: "NBT400",
	},
	{
		id: "3",
		name: "NBT-English",
	},
	{
		id: "4",
		name: "NBT-Hindi",
	},
];

export const categories = [
	{
		id: 1,
		name: "Sports",
	},
	{
		id: 2,
		name: "Entertainment",
	},
	{
		id: 3,
		name: "Education",
	},
	{
		id: 4,
		name: "Others",
	},
];

export const durations = [
	{
		id: "1",
		duration: "Daily",
	},
	{
		id: "2",
		duration: "Custom",
	},
];

export const getRows = (polls) => {
	const rows = polls.map((item) => {
		return ({
			id: item.id,
			campaign_name: item.campaign_name,
			poll_name: item.poll_name,
			end_date: item.end_date,
			duration: item.duration_name,
			start_date: item.start_date,
			responses: item.total_responses ? item.total_responses : "Awaiting",
			created_by: item.created_by,
			created_at: item.created_at,
			status: item.status,
		})
	});
	return rows;
};

export const getColumns = (
	handleStatusChange,
	handleView,
	handleEdit,
	handleDelete,
	admin
) => {
	const currentDate = new Date();

	const columns = [
		{ field: "id", headerName: "ID", width: 50 },
		{
			field: "campaign_name",
			headerName: "Campaign",
			width: 150,
			editable: false,
		},
		{
			field: "poll_name",
			headerName: "Poll Name",
			sortable: false,
			width: 190,
			editable: false,
		},
		{
			field: "duration",
			headerName: "Duration",
			sortable: true,
			width: 130,
			editable: false,
		},
		{
			field: "start_date",
			headerName: "Start Date",
			sortable: true,
			width: 130,
			editable: false,
		},
		{
			field: "end_date",
			headerName: "End Date",
			sortable: true,
			width: 130,
			editable: false,
		},
		{
			field: "responses",
			headerName: "Responses",
			sortable: true,
			width: 100,
			editable: false,
		},
		// {
		// 	field: "created_at",
		// 	headerName: "Created At",
		// 	sortable: true,
		// 	width: 150,
		// 	editable: false,
		// },
		{
			field: "status",
			headerName: "Status",
			sortable: true,
			width: 80,
			editable: false,
			align: "center",
			renderCell: (params) => {
				const endDateArr = params.row.end_date.split("-");
				const formatDate = [
					endDateArr[1],
					endDateArr[0],
					endDateArr[2],
				].join("-");
				const date = new Date(formatDate);
				return (
					<Tooltip title={ params.row.status ? "Active" : "Inactive" }>
						{ admin?.role_id === 1 ? <Switch
							checked={ params.row.status }
							onChange={ () => date >= currentDate ? handleStatusChange(params.id, params.row.status) : null }
							name='status'
							disabled={ date < currentDate }
						/> : <Ballot color={ params.row.status ? "primary" : "disabled" } /> }
					</Tooltip>
				)
			},
		},
		{
			field: "actions",
			headerName: "Actions",
			width: 120,
			sortable: false,
			renderCell: (params) => {
				const startDateArr = params.row.start_date.split("-");
				const formatDate = [
					startDateArr[1],
					startDateArr[0],
					startDateArr[2],
				].join("-");
				const date = new Date(formatDate);

				return (
					<Box>
						<Tooltip title='View more'>
							<IconButton onClick={ () => handleView(params.id) }>
								<Visibility />
							</IconButton>
						</Tooltip>
						{ ((date > currentDate && admin?.role_id === 1) || admin.role_id === 1) && (
							<Tooltip title='Edit'>
								<IconButton
									onClick={ () => {
										console.log("CLIKED", params)
										handleEdit(params.id);
									} }>
									<Edit />
								</IconButton>
							</Tooltip>
						) }
						{ !params.row.status && (
							<Tooltip title='Delete'>
								<IconButton
									onClick={ () => {
										handleDelete(params.id);
									} }>
									<Delete />
								</IconButton>
							</Tooltip>
						) }
					</Box>
				);
			},
		},
	];

	return columns;
};
