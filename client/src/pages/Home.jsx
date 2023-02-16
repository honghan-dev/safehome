import React from "react";
import { useEthers } from "@usedapp/core";
import { BigNumber } from "ethers";
import SignEdDSA from "../components/SignEdDSA";
import GenZKP from "../components/GenZKP";
import SendTx from "../components/SendTx";
import useEdDSA from "../circuits/hooks/useEdDSA";

const msgToSign = BigNumber.from("0x1234").toBigInt();
const verifierContract = "0x3D22ED8Da1684f9D76fD401B85b053B3C5EcAA30";

const Home = () => {
	const { account } = useEthers();
	const privKey = account;
	const { pubKey } = useEdDSA(privKey);
	const [eddsaSignature, setEdDSASignature] = useState();
	const [proof, setProof] = useState();

	return (
		<>
			<div className="text-[20px] font-bold">Welcome to SafeHome</div>
			<h2>Get Signature</h2>
			<SignEdDSA
        		privKey={privKey}
        		message={msgToSign}
     			onResult={(result) => setEdDSASignature(result)}
      		/>
			<h2>Compute zk proof</h2>
			<GenZKP
				message={msgToSign}
				pubKey={pubKey}
				signature={eddsaSignature}
				onResult={(result) => setProof(result)}
			/>
			<h2>Verifying using smart contract</h2>
			<SendTx
				address={verifierContract}
				publicSignals={pubKey ? [msgToSign, ...pubKey] : undefined}
				proof={proof}
			/>
		</>
	);
};

export default Home;
