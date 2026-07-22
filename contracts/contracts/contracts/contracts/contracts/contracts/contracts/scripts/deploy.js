const hre = require("hardhat");

async function main() {
  // Replace these with real addresses when deploying
  const USDC_ADDRESS = "0x41E94Eb019C0762f9Bfcf9Fb12e7c01236F1cD14"; // Amoy USDC example - replace later
  const UMA_ORACLE = "0x0000000000000000000000000000000000000000"; // Replace with real UMA OO address

  console.log("Deploying MarketFactory...");

  const MarketFactory = await hre.ethers.getContractFactory("MarketFactory");
  const factory = await MarketFactory.deploy(USDC_ADDRESS, UMA_ORACLE);

  await factory.waitForDeployment();

  const address = await factory.getAddress();
  console.log("MarketFactory deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
