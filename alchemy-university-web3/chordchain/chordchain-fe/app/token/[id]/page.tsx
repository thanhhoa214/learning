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
    <PageContainer>
      <Card>
        <CardHeader>
          <CardTitle>
            <Badge className="mb-2">Token ID: {params.id}</Badge>
            <br />
            {metadata.name}
          </CardTitle>
          <CardDescription>{metadata.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <LyricPreview lyric={metadata.lyric} />
        </CardContent>
      </Card>
    </PageContainer>
  );
}
