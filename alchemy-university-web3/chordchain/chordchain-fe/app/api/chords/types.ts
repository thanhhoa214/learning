import { Nft } from "alchemy-sdk";
import * as z from "zod";

export const searchFormSchema = z.object({
  query: z.string().optional(),
  genre: z.string().optional(),
  tone: z.string().optional(),
});

export type SearchFormValue = z.infer<typeof searchFormSchema>;

export interface ChordsResponse {
  nfts: Nft[];
}
