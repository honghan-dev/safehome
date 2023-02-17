import React from "react";
import { NavLink } from "react-router-dom";
import { BiHome, BiCalendarPlus, BiGroup, BiBell } from "react-icons/bi";

import "./footer.css";

const Footer = () => {
	const iconStyles = {
		color: "rgb(100 116 139)",
	};

	return (
		<footer className="fixed h-[80px] p-[24px] bottom-0 w-screen bg-white flex justify-between border-t-[1px]">
			<NavLink
				to="/home"
				className={`flex flex-col justify-center self-center gap-[4px] `}
			>
				<BiHome
					style={iconStyles}
					size={26}
					className={`flex flex-col justify-center self-center`}
				/>
				<span className="text-xs text-gray-500">Home</span>
			</NavLink>
			<NavLink
				to="/community"
				className={`flex flex-col justify-center self-center gap-[4px] `}
			>
				<BiGroup
					style={iconStyles}
					size={26}
					className={`flex flex-col justify-center self-center`}
				/>
				<span className="text-xs text-gray-500">Community</span>
			</NavLink>
			<NavLink
				to="/booking"
				className={`flex flex-col justify-center self-center gap-[4px] `}
			>
				<BiCalendarPlus
					style={iconStyles}
					size={26}
					className={`flex flex-col justify-center self-center`}
				/>
				<span className="text-xs text-gray-500">Booking</span>
			</NavLink>
			<NavLink
				to="/notification"
				className={`flex flex-col justify-center self-center gap-[4px] `}
			>
				<BiBell
					style={iconStyles}
					size={26}
					className={`flex flex-col justify-center self-center`}
				/>
				<span className="text-xs text-gray-500">Notification</span>
			</NavLink>
		</footer>
	);
};

export default Footer;
