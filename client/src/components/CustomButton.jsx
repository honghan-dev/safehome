import React from "react";

const CustomButton = ({ btnType, title, handleClick, styles }) => {
	return (
		<button
			type={btnType}
			className={`font-epilogue font-semibold text-[16px] leading-[26px] px-2 py-2 rounded-[10px] ${styles}`}
			onClick={handleClick}
		>
			{title}
		</button>
	);
};

export default CustomButton;
