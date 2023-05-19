import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import Layout from "./layout/Layout";
import Login from "./components/login/Login";
import store from "./redux/store";
import { LOGOUT } from "./redux/actions/actionTypes";
import { useEffect } from "react";
import setAuthToken from "./services/setAuthToken";
import { loadUser } from "./redux/actions/auth.actions";
import { Provider, useDispatch } from "react-redux";
import PrivateRoute from "./utils/PrivateRoute";
import NotFound from "./utils/NotFound";
import Dashboard from "./pages/dashboard/Dashboard";
import Polls from "./pages/polls/Polls";
import AdminManagement from "./pages/admins/AdminManagement";
import Unauthorized from "./utils/Unauthorized";

const theme = createTheme({
	palette: {
		primary: {
			main: "#000000",
		},
		secondary: {
			main: "#282A3A",
		},
	},
});

function App() {
	useEffect(() => {
		// check for token in LS when app first runs
		if (localStorage.authorization) {
			// if there is a token set axios headers for all requests
			setAuthToken(localStorage.authorization);
		}

		// try to fetch a user, if no token or invalid token we
		// will get a 401 response from our API
		store.dispatch(loadUser());

		//log user out from all tabs if they log out in one tab
		window.addEventListener("storage", () => {
			if (!localStorage.authorization) store.dispatch({ type: LOGOUT });
		});
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<Provider store={store}>
				<Router>
					<Routes>
						<Route path='/login' element={<Login />} />
						<Route path='/' element={<Layout />}>
							<Route
								index
								element={
									<PrivateRoute>
										<Dashboard />
									</PrivateRoute>
								}
							/>
							<Route
								path='admins'
								element={
									<PrivateRoute>
										<AdminManagement />
									</PrivateRoute>
								}
							/>
							<Route
								path='polls'
								element={
									<PrivateRoute>
										<Polls />
									</PrivateRoute>
								}
							/>
						</Route>
						<Route path='/*' element={<NotFound />} />
						<Route path='/unauthorized' element={<Unauthorized />} />
					</Routes>
				</Router>
			</Provider>
		</ThemeProvider>
	);
}

export default App;
