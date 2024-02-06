import { Nft } from "alchemy-sdk";

export interface ChordsRequest {
  q?: string;
}

export interface ChordsResponse {
  nfts: Nft[];
}
