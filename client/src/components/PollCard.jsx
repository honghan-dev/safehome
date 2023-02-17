import React, { useContext } from "react";

import { ServiceContext } from "../context";

import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";

const PollCard = ({ topic, description, id, yesCount, noCount }) => {
	const { vote } = useContext(ServiceContext);

	return (
		<div className="w-100 border border-gray-300 p-[16px] overflow-scroll rounded-lg shadow-md">
			<div className="text-[20px] font-bold">{topic}</div>
			<div className="text-[14px] text-gray-500 mb-[10px]">{description}</div>

			{yesCount && (
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-[30px]">
						<button onClick={() => vote(id, true)}>
							<BsHandThumbsUp
								style={{
									color: "green",
									fontWeight: "700",
									width: "22px",
									height: "22px",
								}}
							/>
						</button>
						<button onClick={() => vote(id, false)}>
							<BsHandThumbsDown
								style={{
									color: "red",
									fontWeight: "700",
									width: "22px",
									height: "22px",
								}}
							/>
						</button>
					</div>
					<div className="flex items-center gap-[16px]">
						<div className="flex items-center">
							<BsHandThumbsUp />{" "}
							<span className="text-gray-500 text-[12px]">: {yesCount}</span>
						</div>
						<div className="flex items-center">
							<BsHandThumbsDown />{" "}
							<span className="text-gray-500 text-[12px]">: {noCount}</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PollCard;
