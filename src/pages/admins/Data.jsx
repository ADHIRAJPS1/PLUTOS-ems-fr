import { Person } from "@mui/icons-material";
import { green, purple, yellow } from "@mui/material/colors";

// export const allowedRoles = {
// 	poll: [
// 		{
// 			role_id: 1,
// 			isAllowed: 1,
// 		},
// 		{
// 			role_id: 2,
// 			isAllowed: 1,
// 		},
// 		{
// 			role_id: 3,
// 			isAllowed: 1,
// 		},
// 	],
// 	admin: [
// 		{
// 			role_id: 1,
// 			isAllowed: 1,
// 		},
// 		{
// 			role_id: 2,
// 			isAllowed: 0,
// 		},
// 		{
// 			role_id: 3,
// 			isAllowed: 0,
// 		},
// 	],
// };

export const users = [
	{
		id: 1,
		name: "Jason",
		email: "jason@abc.com",
		mobile: "9876543210",
		role_id: 1,
		client_id: 1,
		client_name: "Plutos",
		campaign_id: 1,
		campaign_name: "Plutos200",
	},
	{
		id: 2,
		name: "Mark",
		email: "mark@abc.com",
		mobile: "9876543210",
		role_id: 2,
		client_id: 2,
		client_name: "Plutos",
		campaign_id: 1,
		campaign_name: "Plutos200",
	},
	{
		id: 3,
		name: "Wilson",
		email: "wilson@abc.com",
		mobile: "9876543210",
		role_id: 3,
		client_id: 3,
		client_name: "Microtek",
		campaign_id: 1,
		campaign_name: "NBT200",
	},
	{
		id: 4,
		name: "Nikki",
		email: "nikki@abc.com",
		mobile: "9876543210",
		role_id: 3,
		client_id: 3,
		client_name: "Ujjivan",
		campaign_id: 1,
		campaign_name: "NBT200",
	},
	{
		id: 5,
		name: "Meena",
		email: "meena@abc.com",
		mobile: "9876543210",
		role_id: 3,
		client_id: 3,
		client_name: "IDFC",
		campaign_id: 1,
		campaign_name: "NBT200",
	},
];

export const adminTypes = (totalSuperAdmin, totalAdmin, totalCampaignAdmin) => [
	{
		heading: "Super Admins",
		icon: <Person fontSize='large' sx={{ color: purple[500] }} />,
		content: totalSuperAdmin.length,
	},
	{
		heading: "Admins",
		icon: <Person fontSize='large' sx={{ color: yellow[700] }} />,
		content: totalAdmin.length,
	},
	{
		heading: "Client Admins",
		icon: <Person fontSize='large' sx={{ color: green[500] }} />,
		content: totalCampaignAdmin.length,
	},
];

export const roles = [
	{
		role_id: 1,
		role_name: "Super Admin",
	},
	{
		role_id: 2,
		role_name: "Admin",
	},
	{
		role_id: 3,
		role_name: "Client Admins",
	},
];

export const clients = [
	{
		client_id: "1",
		client_name: "Ujjivan",
	},
	{
		client_id: "2",
		client_name: "Microtek",
	},
	{
		client_id: "3",
		client_name: "NBT",
	},
	{
		client_id: "4",
		client_name: "Plutos",
	},
];

export const initFormVals = {
	name: "",
	email: "",
	mobile: "",
	password: "",
	role_id: "",
	client_id: "",
};

export const errors = {
	name: {
		err: false,
		errText: "",
	},
	email: {
		err: false,
		errText: "",
	},
	mobile: {
		err: false,
		errText: "",
	},
	password: {
		err: false,
		errText: "",
	},
	role_id: {
		err: false,
		errText: "",
	},
	client_id: {
		err: false,
		errText: "",
	},
};
