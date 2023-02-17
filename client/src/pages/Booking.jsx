import React, { useState, useEffect, useContext } from "react";
import { ServiceContext } from "../context";
import { convertTimestampToDate } from "../utils/helper";
import { CustomButton, PollCard, NewBooking } from "../components";

import { loader } from "./../assets";

const Booking = () => {
	const [bookings, setBookings] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { getUserBookings, currentAccount } = useContext(ServiceContext);

	const fetchBookings = async () => {
		setIsLoading(true);
		const bookings = await getUserBookings();
		setBookings(bookings);
		setIsLoading(false);
		return bookings;
	};

	useEffect(() => {
		fetchBookings();
	}, [currentAccount]);

	return (
		<div className="px-[24px] overflow-scroll pb-[96px]">
			<CustomButton
				btnType="button"
				title="Book Facility"
				handleClick={() => setIsOpen(true)}
				styles={"text-white px-[8px] bg-[#0052B6]"}
			/>
			{isOpen && (
				<NewBooking
					isOpen={isOpen}
					closeModal={() => setIsOpen(false)}
				/>
			)}
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
				<div className="mt-[24px] flex flex-col gap-[16px]">
					{bookings.map((booking, index) => (
						<PollCard
							key={index}
							topic={booking.facilityName}
							description={convertTimestampToDate(booking.startTime)}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Booking;
