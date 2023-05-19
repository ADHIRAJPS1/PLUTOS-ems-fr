import authReducer from "./auth.reducer";
import adminReducer from "./admin.reducer";
import alertReducer from "./alert.reducer";
import pollReducer from "./poll.reducer";
import { combineReducers } from "redux";
export default combineReducers({
	authReducer,
	adminReducer,
	alertReducer,
	pollReducer,
});
