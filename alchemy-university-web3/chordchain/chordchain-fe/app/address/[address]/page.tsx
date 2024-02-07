import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageContainer from "@/components/ui2/PageContainer";
import { alchemy } from "@/lib/alchemy";
import { Accordion } from "@/components/ui/accordion";
import { shortenAddress } from "@/lib/chordchain-contract";
import DonateButton from "@/components/ui2/DonateButton";
import { NFTAccordion } from "@/components/ui2/NFTAccordion";

export default async function OwnerDetailPage({
  params,
}: {
  params: { address: `0x${string}` };
}) {
  const { ownedNfts, totalCount } = await alchemy.nft.getNftsForOwner(
    params.address,
    { contractAddresses: [process.env.CHORDCHAIN_GOERLI_CONTRACT] }
  );

  return (
    <PageContainer>
      <Card>
        <CardHeader className="relative">
          <CardTitle>Owner address: {shortenAddress(params.address)}</CardTitle>
          <CardDescription>
            Total NFT Minted Count: {totalCount}
          </CardDescription>
          <DonateButton
            address={params.address}
            className="absolute right-6 top-4"
          />
        </CardHeader>
        <CardContent>
          <NFTAccordion nfts={ownedNfts} />
        </CardContent>
      </Card>
    </PageContainer>
  );
}
