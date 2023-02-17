import React, { useState } from "react";
import { hello, qrcode } from "./../assets";
import Modal from "react-modal";
import { useEthers } from "@usedapp/core";
import { BigNumber } from "ethers";
import SignEdDSA from "../components/SignEdDSA";
import GenZKP from "../components/GenZKP";
import SendTx from "../components/SendTx";
import useEdDSA from "../circuits/hooks/useEdDSA";

const msgToSign = BigNumber.from("0x1234").toBigInt();
const verifierContract = "0x3D22ED8Da1684f9D76fD401B85b053B3C5EcAA30";

const Home = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { account } = useEthers();
	const privKey = account;
	const { pubKey } = useEdDSA(privKey);
	const [eddsaSignature, setEdDSASignature] = useState();
	const [proof, setProof] = useState();

	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
			borderRadius: "12px",
			width: "70vw",
			height: "70vh",
		},
	};

	return (
		<div className="px-[24px]">
			<div className="text-[20px] font-bold">Welcome to SafeHome</div>
			<div className="flex w-full flex-col justify-center mt-[20px]">
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
					onResult={async (result) => {
					await setProof(result);
					console.log(proof);
					}}
				/>

				<h2>Verifying using smart contract</h2>
				<SendTx
					address={verifierContract}
					publicSignals={pubKey ? [msgToSign, ...pubKey] : undefined}
					proof={proof}
				/>
				<img
					src={hello}
					alt="security"
					className="w-3/4"
				/>
				<div className="flex justify-center">
					<button
						className="font-epilogue w-2/3 text-white text-[16px] bg-[#0052B6] px-2 py-2 rounded-[10px] mt-8"
						onClick={() => setIsOpen(true)}
					>
						Show QR Code
					</button>
				</div>
				<Modal
					isOpen={isOpen}
					onRequestClose={() => setIsOpen(false)}
					ariaHideApp={false}
					style={customStyles}
				>
					<img
						src={qrcode}
						alt="qr code"
					/>
				</Modal>
			</div>
		</div>
	);
};

export default Home;
