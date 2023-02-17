import React, { useState } from "react";
import { hello, qrcode } from "./../assets";
import Modal from "react-modal";

const Home = () => {
	const [isOpen, setIsOpen] = useState(false);

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
