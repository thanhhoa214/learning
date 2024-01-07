import { useEffect, useState } from "react";
import server from "../server";

export default function useBalance(walletAddress: string) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (walletAddress) {
      server
        .get(`balance/${walletAddress}`)
        .then(({ data: { balance } }) => setBalance(balance));
    } else {
      setBalance(0);
    }
  }, [walletAddress]);

  return [balance, setBalance];
}
