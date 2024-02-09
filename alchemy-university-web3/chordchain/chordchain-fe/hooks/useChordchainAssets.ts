import useSWR from "swr";

export default function useChordchainAssets() {
  const swr = useSWR<{
    genres: string[];
    tones: string[];
  }>(
    `https://ipfs.io/ipfs/QmU4DbiQhaiz1ng6LQBU79QgsHvaMBgkT1veuRoSTdLsre/genres_tones.json`
  );

  return swr;
}
