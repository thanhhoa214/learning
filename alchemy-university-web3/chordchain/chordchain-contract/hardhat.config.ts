import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  paths: {
    artifacts: "../chordchain-fe/lib/chordchain-contract/artifacts",
  },
  networks: {
    goerli: {
      url: process.env.ALCHEMY_HTTPS,
      accounts: [
        process.env.TEST_PRIVATE_KEY as string,
        process.env.TEST_ALCHEMY_PRIVATE_KEY as string,
      ],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
  },
  sourcify: {
    enabled: true,
  },
};

export default config;
