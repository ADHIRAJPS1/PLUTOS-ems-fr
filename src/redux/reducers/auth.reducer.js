import {
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
} from "../actions/actionTypes";

const initialState = {
	token: localStorage.getItem("authorization"),
	isAuthenticated: null,
	loading: true,
	admin: null,
	access: null,
	error: false,
};

export default function authReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				admin: payload.admin,
				access: payload.is_access,
			};
		case LOGIN_SUCCESS:
			localStorage.setItem("authorization", payload.token);
			return {
				...state,
				// ...payload,
				isAuthenticated: true,
				access: payload?.admin?.is_access,
				admin: payload?.admin,
				loading: false,
				error: false,
			};

		case AUTH_ERROR: {
			return {
				...state,
				isAuthenticated: false,
				error: true,
			};
		}
		case LOGIN_FAIL:
		case LOGOUT:
			localStorage.removeItem("authorization");
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				admin: null,
			};
		default:
			return state;
	}
}
