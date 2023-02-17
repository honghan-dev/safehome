import React, { useState, useContext, useEffect } from "react";
import { CreatePoll, PollCard } from "./../components";
import { ServiceContext } from "../context";

import { loader } from "./../assets";

const Community = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { polls, fetchPolls } = useContext(ServiceContext);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const loadPolls = async () => {
		setIsLoading(true);
		await fetchPolls();
		setIsLoading(false);
	};

	useEffect(() => {
		loadPolls();
	}, []);

	return (
		<div className="px-[24px] oveflow-scroll mb-[96px]">
			<div className="flex justify-between items-center">
				<span className="text-[20px] font-bold">Community</span>
				<button
					onClick={openModal}
					className="bg-[#66A7FF] text-white font-bold py-2 px-4 rounded"
				>
					Create a poll
				</button>
				{isOpen && (
					<CreatePoll
						isOpen={isOpen}
						closeModal={closeModal}
					/>
				)}
			</div>
			{isLoading ? (
				<div className="flex justify-center items-center mt-[50px]">
					{
						<img
							src={loader}
							className="w-[56px] h-[56px]"
						/>
					}
				</div>
			) : (
				<div className="flex flex-col gap-[16px] mt-[24px]">
					{polls.map((poll, index) => (
						<PollCard
							key={index}
							topic={poll.topic}
							description={poll.description}
							id={index + 1}
							yesCount={poll.yesCount}
							noCount={poll.noCount}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Community;
