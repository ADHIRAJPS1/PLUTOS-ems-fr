import { apicall } from "../../services/api";
import {
	GET_ALL_POLLS,
	ADD_POLL,
	UPDATE_POLL,
	DELETE_POLL,
	ERR_POLL,
} from "./actionTypes";
import { setAlert } from "./alert.actions";

export const getAllPolls = () => async (dispatch) => {
	try {
		const res = await apicall(`/polls/`, "get");
		if (res.data.msg === "No data found.") {
			dispatch({
				type: GET_ALL_POLLS,
				payload: res.data.data,
			});
		} else {
			dispatch({
				type: GET_ALL_POLLS,
				payload: res.data.data,
			});
		}
	} catch (err) {
		dispatch({
			type: ERR_POLL,
			payload: { msg: "Errors in fetching data.", status: err.response.status },
		});
	}
};

export const createPoll = (pollData) => async (dispatch) => {
	try {
		const res = await apicall("/polls/", "post", pollData, {
			headers: {
				"Content-Type": "multipart/form-data",
				"Access-Control-Allow-Origin": "*",
				authorization: localStorage.getItem("authorization"),
			},
		});
		dispatch({
			type: ADD_POLL,
			payload: res.data.data,
		});
		dispatch(getAllPolls());
		dispatch(setAlert(res.data.message, "success"));
	} catch (err) {
		dispatch({
			type: ERR_POLL,
			payload: { msg: err.response.data.message },
		});
		dispatch(setAlert(err.response.data.message, "error"));
	}
};

export const updatePoll = (id, pollData) => async (dispatch) => {
	try {
		const res = await apicall(`/polls/${id}`, "patch", pollData, {
			headers: {
				"Content-Type": "multipart/form-data",
				"Access-Control-Allow-Origin": "*",
				authorization: localStorage.getItem("authorization"),
			},
		});

		dispatch({
			type: UPDATE_POLL,
			payload: {
				pollId: id,
				updatedData: res.data.data,
			},
		});
		dispatch(getAllPolls());
		dispatch(setAlert(res.data.message, "success"));
	} catch (err) {
		dispatch({
			type: ERR_POLL,
			payload: { msg: err },
		});
		dispatch(setAlert(err.response.data.message, "error"));
	}
};

export const deletePoll = (id) => async (dispatch) => {
	if (window.confirm("Are you sure? This can NOT be undone!")) {
		try {
			const res = await apicall(`/polls/${id}`, "delete");
			dispatch({ type: DELETE_POLL, payload: res.data.data.id });

			dispatch(setAlert(res.data.message, "success"));
		} catch (err) {
			dispatch({
				type: ERR_POLL,
				payload: { msg: err.response.message, status: err.response.status },
			});
			dispatch(setAlert(err.response.data.message, "error"));
		}
	}
};
