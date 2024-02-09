"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";
import { ChordsResponse, SearchFormValue } from "./api/chords/types";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { NFTAccordion } from "@/components/ui2/NFTAccordion";

import SearchForm, { SearchFormProps } from "@/components/ui2/SearchForm";
import useChordchainAssets from "@/hooks/useChordchainAssets";
import { omitBy } from "lodash-es";
import { useEffectOnce } from "usehooks-ts";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const [queryParams, setQueryParams] = useState<SearchFormValue>({
    query: "",
  });
  const { data: chordchainAssets } = useChordchainAssets();
  const { data, isLoading } = useSWR<ChordsResponse>(
    `/api/chords?${new URLSearchParams(queryParams).toString()}`
  );

  useEffectOnce(() => {
    const searchParams = new URLSearchParams(location.search);
    const keys: Array<keyof SearchFormValue> = ["query", "genre", "tone"];
    const [query, genre, tone] = keys.map(
      (key) => searchParams.get(key) || undefined
    );
    setQueryParams({ query, genre, tone });
  });

  const { query, genre, tone } = queryParams;
  const isSearching = !!query || !!genre || !!tone;

  const onSubmit: SearchFormProps["onSubmit"] = (value) => {
    const filterUndefined = omitBy(value, (key) => !key);
    setQueryParams(filterUndefined);
    router.push(
      `${pathname}?${new URLSearchParams(filterUndefined).toString()}`
    );
  };

  return (
    <main className="min-h-screen p-8">
      <SearchForm value={queryParams} onSubmit={onSubmit} />

      <Card>
        <CardHeader className="pl-10">
          <CardTitle>Minted chords</CardTitle>
          <CardDescription>Recent minted chords on contract</CardDescription>
        </CardHeader>
        <CardContent className="h-full">
          {isLoading ? (
            Array.from({ length: 5 }, (_, index) => (
              <Skeleton className="h-12 w-full rounded-xl mb-4" key={index} />
            ))
          ) : (
            <NFTAccordion
              nfts={data?.nfts || []}
              empty={
                isSearching && (
                  <p className="px-4">
                    No results were found for{" "}
                    <strong>
                      {query && `“${query}”`}{" "}
                      {genre &&
                        `~ Genre: ${
                          chordchainAssets?.genres[parseInt(genre)]
                        }`}{" "}
                      {tone &&
                        `~ Tone: ${chordchainAssets?.tones[parseInt(tone)]}`}
                    </strong>
                    . Please clear your search and try a different term.
                    <Button
                      type="button"
                      size="sm"
                      className="ml-2"
                      onClick={() => onSubmit({})}
                    >
                      Clear search
                    </Button>
                  </p>
                )
              }
            />
          )}
        </CardContent>
      </Card>
    </main>
  );
}
