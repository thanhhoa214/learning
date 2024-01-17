import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    goerli: {
      url: process.env.ALCHEMY_HTTPS,
      accounts: [
        process.env.TEST_PRIVATE_KEY as string,
        process.env.TEST_ALCHEMY_PRIVATE_KEY as string,
      ],
    },
  },
};

export default config;
