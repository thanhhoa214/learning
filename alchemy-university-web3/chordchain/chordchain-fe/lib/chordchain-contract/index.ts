import { UseContractWriteConfig } from "wagmi";
import ChordsNFT from "./artifacts/contracts/ChordsNFT.sol/ChordsNFT.json";

export const chordchainContractConfig: Partial<
  UseContractWriteConfig<typeof ChordsNFT.abi>
> = {
  address: "0x02617d739c339b2c94916c9873ede7973ca531e7",
  abi: ChordsNFT.abi,
};
