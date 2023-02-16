import React from "react";
import { Route, Router, Routes } from "react-router-dom";

import {
	GetStarted,
	Home,
	Booking,
	Notification,
	Community,
	PageLayout,
} from "./pages";

const App = () => {
	return (
		<>
			<Routes>
				<Route
					path="/"
					exact
					element={<GetStarted />}
				/>
				<Route
					path="/user"
					element={<PageLayout />}
				>
					<Route
						path="/user/home"
						element={<Home />}
					/>
					<Route
						path="/user/booking"
						element={<Booking />}
					/>
					<Route
						path="/user/community"
						element={<Community />}
					/>
					<Route
						path="/user/notification"
						element={<Notification />}
					/>
					<Route
						path="*"
						// element={<ErrorPage />}
					/>
				</Route>
			</Routes>
		</>
	);
};

export default App;
