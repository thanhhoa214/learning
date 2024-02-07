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
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { CreateFormModel } from "@/app/api/create/util";
import LyricPreview from "@/components/ui2/LyricPreview";
import DonateButton from "@/components/ui2/DonateButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircleUserRound, ExternalLink } from "lucide-react";

export default async function TokenDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const nft = await alchemy.nft.getNftMetadata(
    process.env.CHORDCHAIN_GOERLI_CONTRACT,
    BigInt(params.id)
  );

  const metadata = nft.raw.metadata as CreateFormModel;

  if (!nft) return redirect("/404");

  return (
    <PageContainer className="flex items-start gap-8">
      <Card className="w-full">
        <CardHeader className="relative">
          <CardTitle>
            <Badge className="mb-2">Token ID: {params.id}</Badge>
            <br />
            {metadata.name}
          </CardTitle>
          <CardDescription>{metadata.description}</CardDescription>
          {nft.mint?.mintAddress && (
            <DonateButton
              address={nft.mint.mintAddress}
              className="absolute right-6 top-4"
            />
          )}
        </CardHeader>
        <CardContent>
          <LyricPreview lyric={metadata.lyric} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional detail</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <p>
            <strong>Composer:</strong> {metadata.composer || "None"}
          </p>
          <p>
            <strong>Genre:</strong> {metadata.genre || "None"}
          </p>
          {metadata.artist && (
            <>
              <p>
                <strong>Artist name:</strong> {metadata.artist.name || "None"}
              </p>
              <p>
                <strong>Tone:</strong> {metadata.artist.tone || "None"}
              </p>
              <p>
                <strong>Music link:</strong>{" "}
                {metadata.artist.musicLink ? (
                  <Link
                    href={metadata.artist.musicLink}
                    target="_blank"
                    className="chord-link"
                  >
                    {metadata.artist.musicLink}
                  </Link>
                ) : (
                  "None"
                )}
              </p>
            </>
          )}

          {nft.mint?.mintAddress && (
            <DonateButton address={nft.mint.mintAddress} />
          )}
          <Link href={`/address/${nft.mint?.mintAddress}`} className="mt-4">
            <Button variant={"secondary"} className=" w-full">
              Owner <CircleUserRound size={16} className="ml-1" />
            </Button>
          </Link>
          {nft.tokenUri && (
            <Link href={nft.tokenUri} target="_blank">
              <Button variant={"secondary"} className="w-full">
                Raw <ExternalLink size={16} className="ml-1" />
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </PageContainer>
  );
}
