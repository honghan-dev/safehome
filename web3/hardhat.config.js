require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: "0.8.17",
	networks: {
		scrollTestnet: {
			url: process.env.SCROLL_TESTNET_URL,
			accounts: [process.env.PRIVATE_KEY],
			chainId: 534354,
		},
	},
};
