import React, { useState } from "react";

import { facilities, bookingTime } from "../utils/helper";
import { InputSelector } from "../components";

const Booking = () => {
	const [selectedFacility, setSelectedFacility] = useState("");
	const [date, setDate] = useState();
	const [time, setTime] = useState();

	return (
		<form className="relative flex flex-col gap-[10px]">
			<div>
				<span className="mb-[10px]">Choose a facility</span>
				<InputSelector
					options={facilities}
					selected={selectedFacility}
					setSelected={setSelectedFacility}
				/>
			</div>
			{selectedFacility && (
				<div className="flex flex-col gap-[10px]">
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
			<button
				type="submit"
				className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-[24px]"
			>
				Book
			</button>
		</form>
	);
};

export default Booking;
