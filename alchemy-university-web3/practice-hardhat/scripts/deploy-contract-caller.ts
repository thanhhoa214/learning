import hre from "hardhat";

async function main() {
  const contractCaller = await hre.viem.deployContract("ContractCaller");
  console.log(`Deployed to ${contractCaller.address}`);
  const transactionHash = await contractCaller.write.callContract([
    "0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502",
  ]);
  console.log(`Trigger call contract successfully ${transactionHash}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
