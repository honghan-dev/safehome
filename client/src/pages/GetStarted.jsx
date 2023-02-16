import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../components";

import { ServiceContext } from "./../context";

import { logo } from "./../assets/index";

const GetStarted = () => {
	const navigate = useNavigate();

	const { connectWallet, currentAccount } = useContext(ServiceContext);

	return (
		<div className="h-screen bg-[#66A7FF]">
			<div className="flex flex-col justify-end items-center h-3/5">
				<img
					src={logo}
					alt="safehome"
				/>
				<h1 className="text-[38px] font-semibold text-white">SafeHome</h1>
			</div>
			<div className="h-2/5 flex justify-center items-center">
				<CustomButton
					btnType="button"
					title="Connect Wallet"
					styles={"bg-white w-2/3 h-[52px] text-[#66A7FF]"}
					handleClick={async () => {
						if (currentAccount) {
							navigate("user/home");
						} else {
							await connectWallet();
							navigate("user/home");
						}
					}}
				/>
			</div>
		</div>
	);
};

export default GetStarted;
