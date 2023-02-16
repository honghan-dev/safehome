import React, { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constant";

export const ServiceContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = provider.getSigner();
	const serviceContract = new ethers.Contract(
		contractAddress,
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
				yesCount: data[2],
				noCount: data[3],
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

	return (
		<ServiceContext.Provider
			value={{
				connectWallet,
				currentAccount,
				fetchPolls,
				vote,
				createPoll,
				polls,
			}}
		>
			{children}
		</ServiceContext.Provider>
	);
};
