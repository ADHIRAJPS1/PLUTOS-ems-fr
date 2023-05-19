import axios from "axios";

// Create an instance of axios
export const apicall = async (
	path,
	method,
	data,
	options = {
		headers: {
			"Content-Type": "application/json;charset=UTF-8",
			"Access-Control-Allow-Origin": "*",
			//authorization: localStorage.getItem("authorization"),
		},
	},
	baseURL = process.env.REACT_APP_EMS
) => {
	return await axios({
		method,
		url: baseURL + path,
		data,
		options,
	});
};
