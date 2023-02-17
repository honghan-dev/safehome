import React, { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";

import { contractABI, scrollContractAddress } from "../utils/constant";

export const ServiceContext = createContext();

const { ethereum } = window;

// Getting service Contract
const getEthereumContract = () => {
	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = provider.getSigner();
	const serviceContract = new ethers.Contract(
		scrollContractAddress,
		contractABI,
		signer
	);
	return serviceContract;
};

export const ServiceProvider = ({ children }) => {
	// Check if wallet is connected when loaded
	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	// Current Ethereum wallet address
	const [currentAccount, setCurrentAccount] = useState("");
	const [proved, setProved] = useState(null);
	const [polls, setPolls] = useState([]);

	const checkIfWalletIsConnected = async () => {
		try {
			if (!ethereum) return alert("Please install metamask");
			const accounts = await ethereum.request({ method: "eth_accounts" });
			if (accounts.length) {
				setCurrentAccount(accounts[0]);
			}
		} catch (error) {
			console.log(error);
			throw new Error("No ethereum object");
		}
	};

	// Connect wallet function
	const connectWallet = async () => {
		try {
			if (!ethereum) return alert("Please install metamask");
			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			});
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);
			throw new Error("No ethereum object");
		}
	};

	//////// VOTING ////////

	const fetchPolls = async () => {
		const serviceContract = getEthereumContract();
		const pollIds = await serviceContract.getPolls();
		const newPolls = [];

		for (let i = 0; i < pollIds.length; i++) {
			const pollId = pollIds[i];
			const data = await serviceContract.getPollDetails(pollId);

			newPolls.push({
				id: pollId,
				topic: data[0],
				description: data[1],
				yesCount: ethers.BigNumber.from(data[2]).toString(),
				noCount: ethers.BigNumber.from(data[3]).toString(),
				totalCount: data[4],
				createdAt: data[5],
			});
		}
		setPolls(newPolls);
	};

	// Create a new poll and add it to the polls array
	const createPoll = async (form) => {
		const serviceContract = getEthereumContract();
		await serviceContract.createPoll(
			form.topic,
			form.description,
			form.createdAt
		);
		const newPolls = [...polls];

		newPolls.push({
			id: newPolls.length + 1,
			topic,
			description,
			yesCount: 0,
			noCount: 0,
			totalCount: 0,
			createdAt,
		});

		setPolls(newPolls);
	};

	// Vote on a poll
	const vote = async (pollId, choice) => {
		const serviceContract = getEthereumContract();
		await serviceContract.vote(pollId, choice);
		const newPolls = [...polls];

		const pollIndex = newPolls.findIndex((poll) => poll.id === pollId);

		if (choice) {
			newPolls[pollIndex].yesCount++;
		} else {
			newPolls[pollIndex].noCount++;
		}
		newPolls[pollIndex].totalCount++;
		setPolls(newPolls);
	};

	//////// BOOKING /////////

	const bookFacility = async (time, facility) => {
		try {
			const serviceContract = getEthereumContract();
			// Check if the facility is available
			const isAvailable = await serviceContract.isFacilityBooked(
				time,
				facility
			);
			console.log(isAvailable);
			if (isAvailable) {
				throw new Error("The facility is already booked at this time.");
			}
			// Book the facility
			await serviceContract.bookFacility(time, facility);
			// Wait for the booking to be processed
			await serviceContract.provider.waitForTransaction(tx.hash);
			console.log("Facility booked successfully!");
		} catch (error) {
			console.error(error);
		}
	};

	const getUserBookings = async () => {
		const serviceContract = getEthereumContract();
		const userBookings = await serviceContract.getUserBookings();
		return userBookings;
	};

	return (
		<ServiceContext.Provider
			value={{
				connectWallet,
				currentAccount,
				fetchPolls,
				vote,
				createPoll,
				polls,
				bookFacility,
				getUserBookings,
				proved,
				setProved,
			}}
		>
			{children}
		</ServiceContext.Provider>
	);
};
