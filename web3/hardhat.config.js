require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.17",
	networks: {
		scrollTestnet: {
			url: process.env.SCROLL_RPC_URL,
			accounts: [process.env.WALLET_PRIVATE_KEY],
			chainId: 534354,
		},
	},
};
