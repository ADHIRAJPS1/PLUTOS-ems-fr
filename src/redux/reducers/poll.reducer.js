import {
	GET_ALL_POLLS,
	ADD_POLL,
	UPDATE_POLL,
	DELETE_POLL,
	ERR_POLL,
} from "../actions/actionTypes";

const initialState = {
	polls: [],
	allowedRoles: [],
	errors: false,
};

export default function pollReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_ALL_POLLS:
			return {
				...state,
				polls: payload,
				loading: false,
				errors: false,
			};

		case UPDATE_POLL:
			return {
				...state,
				polls: state.polls.map((poll) =>
					poll.pollId === payload.pollId ? { ...poll, payload } : poll
				),
				loading: false,
				errors: false,
			};
		case ADD_POLL:
			return {
				...state,
				polls: [payload, ...state.polls],
				loading: false,
				errors: false,
			};
		case DELETE_POLL:
			return {
				...state,
				polls: state.polls.filter((poll) => poll.id !== payload),
				loading: false,
				errors: false,
			};
		case ERR_POLL:
			return {
				...state,
				errors: true,
				loading: false,
			};
		default:
			return state;
	}
}
