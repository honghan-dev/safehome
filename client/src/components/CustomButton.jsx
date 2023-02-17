import React from "react";

const CustomButton = ({ btnType, title, handleClick, styles }) => {
	return (
		<button
			type={btnType}
			className={`font-epilogue text-[16px] bg-[#0052B6] px-2 py-2 rounded-[10px] ${styles}`}
			onClick={handleClick}
		>
			{title}
		</button>
	);
};

export default CustomButton;
