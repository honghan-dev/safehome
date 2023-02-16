import React, { useState } from "react";
import Modal from "react-modal";

const CreatePoll = ({ isOpen, closeModal }) => {
	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
			borderRadius: "12px",
		},
	};

	const [formValues, setFormValues] = useState({
		topic: "",
		title: "",
		description: "",
		endsAt: "",
	});

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(formValues);
		setFormValues({ topic: "", title: "", description: "", endsAt: "" });
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormValues({ ...formValues, [name]: value });
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
			ariaHideApp={false}
			style={customStyles}
		>
			<h2 className="text-[20px] font-bold mb-[16px]">Create a poll</h2>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-[10px]"
			>
				<div className="flex flex-col">
					<label className="text-[14px] mb-[4px]">Topics</label>
					<input
						type="text"
						name="topic"
						value={formValues.topic}
						onChange={handleInputChange}
						className="block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-gray-500 focus:outline-none mt-[4px]"
					/>
				</div>
				<div>
					<label className="text-[14px] mb-[4px]">Title</label>
					<input
						type="text"
						name="title"
						value={formValues.title}
						onChange={handleInputChange}
						className="block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-gray-500 focus:outline-none mt-[4px]"
					/>
				</div>
				<div className="flex flex-col">
					<label className="text-[14px] mb-[4px]">Description</label>
					<textarea
						name="description"
						value={formValues.description}
						onChange={handleInputChange}
						cols="30"
						rows="3"
						placeholder="Description"
						className="block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-gray-500 focus:outline-none mt-[4px]"
					></textarea>
				</div>
				<div className="flex justify-between">
					<button
						type="submit"
						className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-[1.5rem]"
					>
						Create
					</button>
					<button
						onClick={closeModal}
						className="bg-white hover:bg-red-700 text-red-500 font-bold py-2 px-4 rounded mt-[1.5rem] border-red-500 border"
					>
						Close
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default CreatePoll;
