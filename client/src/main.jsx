import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ServiceProvider } from "./context";

import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<ServiceProvider>
		<Router>
			<App />
		</Router>
	</ServiceProvider>
);
