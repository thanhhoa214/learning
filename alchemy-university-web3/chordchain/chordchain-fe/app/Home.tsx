"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { alchemy } from "@/lib/alchemy";
import { Accordion } from "@/components/ui/accordion";
import { Nft } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { CHORDCHAIN_GOERLI_CONTRACT } from "@/lib/chordchain-contract";
import { useBoolean } from "usehooks-ts";
import { NftItem } from "./page";

export default function Home() {
  const [nfts, setNfts] = useState<Nft[]>([]);
  const { value, setTrue, setFalse } = useBoolean(false);

  useEffect(() => {
    console.log(alchemy);
    (async () => {
      setTrue();
      alchemy.nft.getNftsForContract(CHORDCHAIN_GOERLI_CONTRACT);
      // .then(({ nfts }) => setNfts(nfts));
    })();
  }, []);

  return (
    <main className="min-h-screen p-8">
      <Card>
        <CardHeader>
          <CardTitle>Minted chords</CardTitle>
          <CardDescription>Recent minted chords on contract</CardDescription>
        </CardHeader>
        <CardContent>
          {nfts.length ? (
            <Accordion type="single" collapsible className="w-full">
              {nfts.map((nft, index) => (
                <NftItem nft={nft} index={index} key={nft.tokenId} />
              ))}
            </Accordion>
          ) : (
            <p>No NFTs has been minted.</p>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
