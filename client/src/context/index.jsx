import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constant";

export const ServiceContext = React.createContext();

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

	return (
		<ServiceContext.Provider
			value={{
				connectWallet,
				currentAccount,
			}}
		>
			{children}
		</ServiceContext.Provider>
	);
};
