import React, { useState, useContext, useEffect } from "react";
import { CreatePoll, PollCard } from "./../components";
import { ServiceContext } from "../context";

const Community = () => {
	const [isOpen, setIsOpen] = useState(false);

	const { polls, fetchPolls } = useContext(ServiceContext);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		fetchPolls();
		console.log(polls);
	}, []);

	return (
		<div className="px-[24px] ">
			<div className="flex justify-between items-center">
				<span className="text-[20px] font-bold">Community</span>
				<button
					onClick={openModal}
					className="bg-[#66A7FF] hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
			<div className="flex flex-col gap-[16px] mt-[16px]">
				{polls.map((poll, index) => (
					<PollCard
						key={index}
						topic={poll.topic}
						description={poll.description}
						yesCount={poll.yesCount}
						noCount={poll.noCount}
					/>
				))}
			</div>
		</div>
	);
};

export default Community;
