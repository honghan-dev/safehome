import React, { useState, useContext } from "react";
import Modal from "react-modal";

import { ServiceContext } from "./../context";
import { CustomButton, InputSelector } from "./../components";
import { unixTimestamp } from "./../utils/helper";
import { facilities, bookingTime } from "./../utils/helper";

const NewBooking = ({ isOpen, closeModal }) => {
	const [selectedFacility, setSelectedFacility] = useState("");
	const [date, setDate] = useState();
	const [time, setTime] = useState();

	const { bookFacility } = useContext(ServiceContext);

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

	const handleSubmit = async (e) => {
		e.preventDefault();
		const dateString = date + " " + time;
		const timeStamp = unixTimestamp(dateString);
		try {
			await bookFacility(timeStamp, selectedFacility);
		} catch (error) {
			console.log("Facility is already booked");
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
			style={customStyles}
		>
			<form
				onSubmit={handleSubmit}
				className="relative flex flex-col gap-[10px]"
			>
				<div>
					<span className="mb-[10px]">Choose a facility</span>
					<InputSelector
						options={facilities}
						selected={selectedFacility}
						setSelected={setSelectedFacility}
					/>
				</div>
				{selectedFacility && (
					<div className="flex flex-col gap-[10px] mb-1">
						<div>
							<label className="text-[14px]">Date</label>
							<input
								type="date"
								name="date"
								value={date}
								onChange={() => setDate(event.target.value)}
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
							<label className="text-[14px]">Time</label>
							<InputSelector
								options={bookingTime}
								selected={time}
								setSelected={setTime}
							/>
						</div>
					</div>
				)}
				<CustomButton
					type="submit"
					title="Book Facility"
					styles={"w-full text-white"}
				/>
			</form>
		</Modal>
	);
};

export default NewBooking;
