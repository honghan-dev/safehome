import { useLocation, Navigate, Outlet } from "react-router-dom";
import { ServiceContext } from "../context";

const ProtectedRoute = () => {
	const { currentAccount } = useContext(ServiceContext);
	const location = useLocation();

	//   Checking whether owner connected wallet
	return currentAccount ? (
		<Outlet />
	) : (
		<Navigate
			to="/start"
			state={{ from: location }}
			replace={true}
		/>
	);
};

export default ProtectedRoute;
