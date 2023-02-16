import { Navbar, Footer } from "../components";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
};

export default PageLayout;
