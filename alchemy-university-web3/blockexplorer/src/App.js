import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";

import "./App.css";
import Block from "./components/Block";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [block, setBlock] = useState();

  useEffect(() => {
    async function getBlock() {
      setBlock(await alchemy.core.getBlockWithTransactions("latest"));
    }
    getBlock();
  }, []);

  return <div>{block ? <Block block={block} /> : <span>Loading...</span>}</div>;
}

export default App;
