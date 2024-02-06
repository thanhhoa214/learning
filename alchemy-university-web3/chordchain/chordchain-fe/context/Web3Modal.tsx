"use client";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import { mainnet, goerli } from "viem/chains";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "931bf2ad87a8bb12030a8cef4e1b1834";

// 2. Create wagmiConfig
const metadata = {
  title: "Chordchain",
  description: "Earn from your chord contribution",
  url: "https://chordchain.vercel.app",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [goerli, mainnet];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  defaultChain: chains[0],
  enableAnalytics: true,
});

export function Web3Modal({ children }: React.PropsWithChildren) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
