import { ethers, upgrades } from "hardhat";

const DEPLOYED_PROXY_ADDRESS = "0x5D3F66039E6742b7d0FC4045B9E2aE908be77701";

async function main() {
  const VendingMachineV2 = await ethers.getContractFactory("VendingMachineV2");
  const proxy = await upgrades.upgradeProxy(
    DEPLOYED_PROXY_ADDRESS,
    VendingMachineV2
  );

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    DEPLOYED_PROXY_ADDRESS
  );

  console.log(`Proxy contract address: ${await proxy.owner()}`);
  console.log(`Implementation contract address: ${implementationAddress}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
