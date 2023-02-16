import React from "react";
import { useEthers } from "@usedapp/core";
import { BigNumber } from "ethers";
import SignEdDSA from "../components/SignEdDSA";

const msgToSign = BigNumber.from("0x1234").toBigInt();

const Home = () => {
	const { account } = useEthers();
	const privKey = account;

	return (
		<>
			<div className="text-[20px] font-bold">Welcome to SafeHome</div>
			<h2>Get Signature</h2>
			<SignEdDSA
        	privKey={privKey}
        	message={msgToSign}
     		onResult={(result) => setEdDSASignature(result)}
      		/>
		</>
	);
};

export default Home;
