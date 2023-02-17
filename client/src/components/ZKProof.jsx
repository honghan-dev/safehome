import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../context";
import { CustomButton } from "./index";
import { security } from "./../assets";
import { zkProof } from "./../utils/zkProof";

const ZKProof = () => {
	const { proved, setProved } = useContext(ServiceContext);
	const [privateKey, setPrivateKey] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (privateKey === zkProof) {
			navigate("/home");
		} else {
			setProved(true);
		}
	};

	return (
		<div className="w-screen h-screen bg-white ">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col justify-center items-center h-full"
			>
				<img
					src={security}
					alt="security"
					className="w-2/3 mb-[34px]"
				/>
				<div className="w-2/3 flex flex-col">
					<label className="text-[24px] text-black">
						Please enter your security word
					</label>
					<input
						value={privateKey}
						name="privateKey"
						type="text"
						onChange={() => setPrivateKey(event.target.value)}
						className={`w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out  focus:text-gray-700 focus:bg-white focus:border-gray-500 focus:outline-none mt-[4px] ${
							proved !== true || (proved !== null && "border-red-500")
						}`}
					/>
					{proved !== true ||
						(proved !== null && (
							<div className="text-red-500 text-xs">Incorrect key</div>
						))}
				</div>
				<CustomButton
					btnType="submit"
					title="Proof"
					styles={"mt-[60px] text-white w-2/3 h-[52px]"}
				/>
			</form>
		</div>
	);
};

export default ZKProof;
