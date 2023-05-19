import { apicall } from "./api";
import axios from "axios";

// store our JWT in LS and set axios headers if we do have a token
const setAuthToken = (token) => {
	if (token) {
		axios.defaults.headers.common["authorization"] = token;
		localStorage.setItem("authorization", token);
	} else {
		delete axios.defaults.headers.common["authorization"];
		localStorage.removeItem("authorization");
	}
};

export default setAuthToken;
