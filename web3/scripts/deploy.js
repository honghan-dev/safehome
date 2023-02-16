const { ethers } = require("hardhat");

async function main() {
	const Service = await ethers.getContractFactory("Service");
	const service = await Service.deploy();

	await service.deployed();
	console.log("Service deployed to:", service.address);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
