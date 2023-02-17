export const facilities = [
	"Swimming pool",
	"Event hall",
	"Badminton Court",
	"Futsal Court",
];

export const pollTopics = ["Management", "Security", "Events", "Others"];

export const bookingTime = [
	"0800",
	"0900",
	"1000",
	"1100",
	"1200",
	"1300",
	"1400",
	"1500",
	"1600",
	"1700",
	"1800",
	"1900",
	"2000",
	"2100",
];

export const unixTimestamp = (dateString) => {
	const [date, time] = dateString.split(" ");
	const [year, month, day] = date.split("-");
	const [hour, minute] = time.match(/\d{2}/g);
	const datetime = new Date(year, month - 1, day, hour, minute);
	return datetime.getTime() / 1000;
};

export const convertTimestampToDate = (bigNumber) => {
	const unixTimestamp = bigNumber.toNumber();
	const date = new Date(unixTimestamp * 1000);
	const options = {
		timeZone: "Asia/Singapore",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	};
	const dateTimeString = date.toLocaleString("en-US", options);

	return dateTimeString.replace(",", "");
};
