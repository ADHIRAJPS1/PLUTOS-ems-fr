import {
	GET_ALL_ADMINS,
	ADD_ADMIN,
	UPDATE_ADMIN,
	DELETE_ADMIN,
	ERR_ADMIN,
} from "../actions/actionTypes";

const initialState = {
	admins: [],
	allowedRoles: [],
	errors: false,
};

export default function adminReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_ALL_ADMINS:
			return {
				...state,
				admins: payload,
				loading: false,
				errors: false,
			};

		case UPDATE_ADMIN:
			return {
				...state,
				admins: state.admins.map((admin) =>
					admin.adminId === payload.adminId ? { ...admin, payload } : admin
				),
				loading: false,
				errors: false,
			};
		case ADD_ADMIN:
			return {
				...state,
				admins: [payload, ...state.admins],
				loading: false,
				errors: false,
			};
		case DELETE_ADMIN:
			return {
				...state,
				admins: state.admins.filter((admin) => admin.id !== payload),
				loading: false,
				errors: false,
			};
		case ERR_ADMIN:
			return {
				...state,
				errors: true,
				loading: false,
			};
		default:
			return state;
	}
}
