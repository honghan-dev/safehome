import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../components";

import { connectWallet, currentAccount } from "./../context/index";

import { logo } from "./../assets/index";

const GetStarted = () => {
	const navigate = useNavigate();

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
					handleClick={() => {
						if (currentAccount) {
							navigate("user/home");
						} else {
							connectWallet();
						}
					}}
				/>
			</div>
		</div>
	);
};

export default GetStarted;
