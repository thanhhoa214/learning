"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Nft } from "alchemy-sdk";
import { ETHERSCAN_URL } from "@/lib/chordchain-contract";
import { Button } from "@/components/ui/button";
import { CircleUserRound, ExternalLink, Music4, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";
import { ChordsRequest, ChordsResponse } from "./api/chords/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { FormEventHandler } from "react";
import { CreateFormModel } from "./api/create/util";

type QueryKey = keyof ChordsRequest;
const QUERY_Q: QueryKey = "q";

export default function Home() {
  const router = useRouter();
  const query = useSearchParams();
  const q = query.get(QUERY_Q);
  const { data, error, isLoading } = useSWR<ChordsResponse>(
    `/api/chords?${QUERY_Q}=${q}`
  );
  const pathname = usePathname();

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const inputValue = event.currentTarget["query"].value;
    router.push(`${pathname}?${QUERY_Q}=${inputValue}`);
  };

  return (
    <main className="min-h-screen p-8">
      <form onSubmit={onSubmit} className="flex gap-4 mb-6">
        <Input
          name="query"
          placeholder="Search chords by song's name, lyric, composer, artist"
        />
        <Button type="submit" className="gap-1">
          <Search size={20} /> Search
        </Button>
      </form>

      <Card>
        <CardHeader>
          <CardTitle>Minted chords</CardTitle>
          <CardDescription>Recent minted chords on contract</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            Array.from({ length: 5 }, (_, index) => (
              <Skeleton className="h-12 w-full rounded-xl mb-4" key={index} />
            ))
          ) : data?.nfts.length ? (
            <Accordion type="single" collapsible className="w-full">
              {data?.nfts.map((nft, index) => (
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

function NftItem({ nft, index }: { nft: Nft; index: number }) {
  const metadata = nft.raw.metadata as CreateFormModel;
  return (
    <AccordionItem value={nft.tokenId} className="border-b-0">
      <AccordionTrigger>
        <div className="flex justify-between items-center w-full">
          <p className="flex gap-1">
            <strong>
              {index + 1}. {metadata.name}
            </strong>
            <span>|</span>
            <span>{metadata.composer}</span>
          </p>
          <div className="flex gap-2 mr-2">
            <Link href={`/token/${nft.tokenId}`}>
              <Button size={"sm"} variant={"secondary"}>
                Chords <Music4 size={16} className="ml-1" />
              </Button>
            </Link>
            <Link
              href={`${ETHERSCAN_URL}/address/${nft.mint?.mintAddress}`}
              target="_blank"
            >
              <Button size={"sm"} variant={"secondary"}>
                Owner <CircleUserRound size={16} className="ml-1" />
              </Button>
            </Link>
            {nft.tokenUri && (
              <Link href={nft.tokenUri} target="_blank">
                <Button size={"sm"} variant={"secondary"}>
                  Raw <ExternalLink size={16} className="ml-1" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="flex gap-4 text-slate-700 dark:text-slate-300">
        <div>
          <p>
            <strong>Composer:</strong> {metadata.composer || "None"}
          </p>
          <p>
            <strong>Genre:</strong> {metadata.genre || "None"}
          </p>
        </div>
        {metadata.artist && (
          <div>
            <p>
              <strong>Artist name:</strong> {metadata.artist.name || "None"}
            </p>
            <p>
              <strong>Tone:</strong> {metadata.artist.tone || "None"}
            </p>
            <p>
              <strong>Music link:</strong>{" "}
              {metadata.artist.musicLink ? (
                <Link href={metadata.artist.musicLink} target="_blank">
                  {metadata.artist.musicLink}
                </Link>
              ) : (
                "None"
              )}
            </p>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
