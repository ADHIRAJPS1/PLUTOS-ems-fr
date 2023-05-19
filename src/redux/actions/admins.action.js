import { apicall } from "../../services/api";
import {
	GET_ALL_ADMINS,
	ADD_ADMIN,
	UPDATE_ADMIN,
	DELETE_ADMIN,
	ERR_ADMIN,
} from "../actions/actionTypes";
import { setAlert } from "./alert.actions";

export const getAllAdmins = () => async (dispatch) => {
	try {
		const res = await apicall(`/admins/`, "get");
		if (res.data.msg === "No data found.") {
			dispatch({
				type: GET_ALL_ADMINS,
				payload: res.data.data,
			});
		} else {
			dispatch({
				type: GET_ALL_ADMINS,
				payload: res.data.data,
			});
		}
	} catch (err) {
		dispatch({
			type: ERR_ADMIN,
			payload: { msg: "error in get all data", status: err.response.status },
		});
	}
};

export const createAdmin = (adminData) => async (dispatch) => {
	try {
		const res = await apicall(
			"/admins/",
			"post",
			adminData
			// {
			// 	headers: {
			// 		"Content-Type": "multipart/form-data",
			// 		"Access-Control-Allow-Origin": "*",
			// 		authorization: token,
			// 	},
			// }
		);
		dispatch({
			type: ADD_ADMIN,
			payload: res.data.data,
		});
		dispatch(getAllAdmins());
		dispatch(setAlert(res.data.message, "success"));
	} catch (err) {
		dispatch({
			type: ERR_ADMIN,
			payload: { msg: err.response.data.message },
		});
		dispatch(setAlert(err.response.data.message, "error"));
	}
};

export const updateAdmin = (id, adminData) => async (dispatch) => {
	try {
		const res = await apicall(
			`/admins/${id}`,
			"patch",
			adminData
			// {
			// 	headers: {
			// 		"Content-Type": "multipart/form-data",
			// 		"Access-Control-Allow-Origin": "*",
			// 	},
			// }
		);

		dispatch({
			type: UPDATE_ADMIN,
			payload: {
				admin_id: id,
				updatedData: res.data.data,
			},
		});
		dispatch(getAllAdmins());
		dispatch(setAlert(res.data.message, "success"));
	} catch (err) {
		dispatch({
			type: ERR_ADMIN,
			payload: { msg: err },
		});
		dispatch(setAlert(err.response.data.message, "error"));
	}
};

export const deleteAdmin = (id) => async (dispatch) => {
	if (window.confirm("Are you sure? This can NOT be undone!")) {
		try {
			const res = await apicall(`/admins/${id}`, "delete");
			dispatch({ type: DELETE_ADMIN, payload: res.data.data.id });

			dispatch(setAlert(res.data.message, "success"));
		} catch (err) {
			dispatch({
				type: ERR_ADMIN,
				payload: { msg: err.response.msg, status: err.response.status },
			});
			dispatch(setAlert(err.response.data.message, "error"));
		}
	}
};
