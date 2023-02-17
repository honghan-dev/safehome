import React, { useContext } from "react";
import { Route, Routes, useLocation, Navigate, Outlet } from "react-router-dom";

import {
	GetStarted,
	Home,
	Booking,
	Notification,
	Community,
	PageLayout,
} from "./pages";

import { ZKProof } from "./components";
import { ServiceContext } from "./context";

// Only allow user to access after authenticate
const ProtectedRoute = () => {
	const { currentAccount } = useContext(ServiceContext);
	const location = useLocation();

	//   Checking whether owner connected wallet
	return currentAccount ? (
		<Outlet />
	) : (
		<Navigate
			to="/connect"
			state={{ from: location }}
			replace={true}
		/>
	);
};

const App = () => {
	return (
		<>
			<Routes>
				<Route
					path="/connect"
					exact
					element={<GetStarted />}
				/>
				<Route
					path="/zk"
					exact
					element={<ZKProof />}
				/>
				<Route element={<ProtectedRoute />}>
					<Route
						path="/"
						element={<PageLayout />}
					>
						<Route
							path="home"
							element={<Home />}
						/>
						<Route
							path="booking"
							element={<Booking />}
						/>
						<Route
							path="community"
							element={<Community />}
						/>
						<Route
							path="notification"
							element={<Notification />}
						/>
					</Route>
				</Route>
			</Routes>
		</>
	);
};

export default App;
