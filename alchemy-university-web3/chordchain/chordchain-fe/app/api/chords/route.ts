import { alchemy } from "@/lib/alchemy";
import { NextRequest } from "next/server";
import { CreateFormModel } from "../create/util";
import { search } from "fast-fuzzy";
import { SearchFormValue } from "./types";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const keys: Array<keyof SearchFormValue> = ["query", "genre", "tone"];
  const [q, genre, tone] = keys.map((key) => searchParams.get(key));
  let { nfts } = await alchemy.nft.getNftsForContract(
    process.env.CHORDCHAIN_GOERLI_CONTRACT
  );

  if (q) {
    nfts = search(
      q,
      nfts.map((n) => {
        const metadata = n.raw.metadata as CreateFormModel;
        const searchField = [
          metadata.name,
          metadata.composer,
          metadata.lyric,
          metadata.artist.name,
        ]
          .filter(Boolean)
          .join(" ");
        return { nft: n, searchField };
      }),
      { keySelector: ({ searchField }) => searchField }
    ).map(({ nft }) => nft);
  }

  if (genre)
    nfts = nfts.filter(
      (n) => (n.raw.metadata as CreateFormModel).genre === genre
    );

  if (tone)
    nfts = nfts.filter(
      (n) => (n.raw.metadata as CreateFormModel).artist.tone === tone
    );
  return Response.json({ nfts });
}
