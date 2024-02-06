import { alchemy } from "@/lib/alchemy";
import { NextRequest } from "next/server";
import { CreateFormModel } from "../create/util";
import { fuzzy } from "fast-fuzzy";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q");
  const { nfts } = await alchemy.nft.getNftsForContract(
    process.env.CHORDCHAIN_GOERLI_CONTRACT
  );

  const filteredNfts = !q
    ? nfts
    : nfts
        .map((n) => {
          const metadata = n.raw.metadata as CreateFormModel;
          const targets = [
            metadata.name,
            metadata.composer,
            metadata.lyric,
            metadata.artist.name,
          ]
            .filter(Boolean)
            .join(" ");
          return { nft: n, score: fuzzy(q, targets) };
        })
        .sort((a, b) => a.score - b.score)
        .map(({ nft }) => nft);

  return Response.json({ nfts: filteredNfts });
}
