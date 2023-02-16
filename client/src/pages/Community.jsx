import React, { useState } from "react";
import { CreatePoll, PollCard } from "./../components";

const Community = () => {
	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	// Dummy data
	const polls = [
		{
			topic: "Increase security guard",
			description: "Increase security guard especially at night",
			yesCount: 5,
			noCount: 2,
		},
		{
			topic: "Increase number of rubbish bin",
			description:
				"Increase the number of rubbish bin around swimming pool area",
			yesCount: 6,
			noCount: 2,
		},
		{
			topic: "Increase number of rubbish bin",
			description:
				"Increase the number of rubbish bin around swimming pool area",
			yesCount: 6,
			noCount: 2,
		},
		{
			topic: "Increase number of rubbish bin",
			description:
				"Increase the number of rubbish bin around swimming pool area",
			yesCount: 6,
			noCount: 2,
		},
	];

	return (
		<div>
			<div className="flex justify-between items-center">
				<span className="text-[20px] font-bold">Community</span>
				<button
					onClick={openModal}
					className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
			<div className="flex flex-col gap-[16px]">
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
