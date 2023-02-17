import React from "react";

import { relax } from "./../assets/index";

const Notification = () => {
	return (
		<div className="flex flex-col justify-center items-center">
			<img
				className="w-2/3 mt-[24px]"
				src={relax}
				alt="relax"
			/>
			<div className="text-gray-500 mt-[36px]">
				Hooray! You have no notification
			</div>
		</div>
	);
};

export default Notification;
