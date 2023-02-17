import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../components";

import { ServiceContext } from "./../context";

import { logo } from "./../assets/index";

const GetStarted = () => {
	const navigate = useNavigate();

	const { connectWallet, currentAccount } = useContext(ServiceContext);

	return (
		<div className="h-screen bg-[#0052B6]">
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
					styles={"bg-white w-2/3 h-[52px] text-[#0052B6]"}
					handleClick={async () => {
						if (currentAccount) {
							navigate("/zk");
						} else {
							await connectWallet();
							navigate("/zk");
						}
					}}
				/>
			</div>
		</div>
	);
};

export default GetStarted;
