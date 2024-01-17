import hre from "hardhat";

async function main() {
  const faucet = await hre.viem.deployContract("Faucet", []);
  console.log(`Faucet deployed to ${faucet.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
