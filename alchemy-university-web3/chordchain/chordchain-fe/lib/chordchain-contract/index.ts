import { UseContractReadConfig } from "wagmi";
import ChordsNFT from "./artifacts/contracts/ChordsNFT.sol/ChordsNFT.json";

export const ETHERSCAN_URL = "https://goerli.etherscan.io";
export const CHORDCHAIN_GOERLI_CONTRACT =
  "0x856f519403bee9ce058ffe368c3f67de3aec64d4";

export const chordchainContractConfig: Pick<
  UseContractReadConfig<typeof ChordsNFT.abi>,
  "abi" | "address"
> = {
  address: CHORDCHAIN_GOERLI_CONTRACT,
  abi: ChordsNFT.abi,
};
