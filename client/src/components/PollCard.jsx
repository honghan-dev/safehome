import React from "react";

const PollCard = ({ topic, description }) => {
	return (
		<div className="w-100 border border-gray-300 p-[16px] mt-[20px] overflow-scroll rounded">
			<div className="text-[20px] font-bold">{topic}</div>
			<div className="text-[14px] text-gray-500 mb-[10px]">{description}</div>
			<div className="flex items-center gap-[16px]">
				<button className="bg-green-500 text-white text-[14px] px-[10px] rounded">
					Yes
				</button>
				<button className="bg-red-500 text-white text-[14px] px-[10px] rounded">
					No
				</button>
			</div>
		</div>
	);
};

export default PollCard;
