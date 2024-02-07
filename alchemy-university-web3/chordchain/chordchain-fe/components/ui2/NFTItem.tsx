import { CreateFormModel } from "@/app/api/create/util";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Nft } from "alchemy-sdk";
import { Button } from "../ui/button";
import { CircleUserRound, ExternalLink, Music4 } from "lucide-react";

export function NftItem({ nft, index }: { nft: Nft; index: number }) {
  const metadata = nft.raw.metadata as CreateFormModel;
  return (
    <AccordionItem value={nft.tokenId} className="border-b-0">
      <AccordionTrigger>
        <div className="flex flex-col gap-2 md:flex-row justify-between items-center w-full">
          <p className="space-x-1">
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
            <Link href={`/address/${nft.mint?.mintAddress}`}>
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
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
