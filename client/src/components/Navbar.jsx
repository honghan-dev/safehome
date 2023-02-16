import React, { useState } from "react";
import Modal from "react-modal";
import { BiInfoCircle } from "react-icons/bi";
import { AboutUs } from "./index";

const Navbar = () => {
	const iconStyle = {
		color: "#ffffff",
	};

	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
			borderRadius: "12px",
			maxWidth: "calc(100%-48px)",
		},
	};

	const [isOpen, setIsOpen] = useState(false);

	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<div className="flex justify-center mb-[35px] gap-6 bg-[#66A7FF] h-[80px] items-center relative">
			<div className="text-white font-bold text-[20px]">SafeHome</div>
			<div
				className="absolute right-[24px]"
				onClick={() => setIsOpen(true)}
			>
				<BiInfoCircle
					style={iconStyle}
					size={26}
				/>
			</div>
			{isOpen && (
				<Modal
					isOpen={isOpen}
					onRequestClose={closeModal}
					style={customStyles}
				>
					<AboutUs />
					<button
						onClick={closeModal}
						className="bg-white hover:bg-red-700 text-red-500 font-bold py-2 px-4 rounded mt-[1.5rem] border-red-500 border"
					>
						Close
					</button>
				</Modal>
			)}
		</div>
	);
};

export default Navbar;
