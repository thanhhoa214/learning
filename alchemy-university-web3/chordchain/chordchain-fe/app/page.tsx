"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";
import { ChordsRequest, ChordsResponse } from "./api/chords/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { FormEventHandler } from "react";
import { NFTAccordion } from "@/components/ui2/NFTAccordion";

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
        <CardContent className="h-full">
          {isLoading ? (
            Array.from({ length: 5 }, (_, index) => (
              <Skeleton className="h-12 w-full rounded-xl mb-4" key={index} />
            ))
          ) : (
            <NFTAccordion nfts={data?.nfts || []} />
          )}
        </CardContent>
      </Card>
    </main>
  );
}
