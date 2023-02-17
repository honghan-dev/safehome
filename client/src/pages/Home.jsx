import React from "react";
import { hello } from "./../assets";

import QRCode from "qrcode";

const Home = () => {
	return (
		<div className="px-[24px]">
			<div className="text-[20px] font-bold">Welcome to SafeHome</div>
			<div className="flex w-full justify-center mt-[20px]">
				<img
					src={hello}
					alt="security"
					className="w-3/4"
				/>
			</div>
		</div>
	);
};

export default Home;
