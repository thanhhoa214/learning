"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AudioWaveform,
  Github,
  Info,
  Moon,
  PencilRuler,
  ReceiptText,
  Sun,
} from "lucide-react";
import { useDarkMode, useMediaQuery, useIsClient } from "usehooks-ts";
import { useAccount } from "wagmi";
import Link from "next/link";
import {
  CHORDCHAIN_GOERLI_CONTRACT,
  ETHERSCAN_URL,
} from "@/lib/chordchain-contract";

export default function Navbar() {
  const isClient = useIsClient();
  const { address } = useAccount();
  const isMedium = useMediaQuery("(min-width: 768px)");
  const darkMode = useDarkMode({ initializeWithValue: false });

  return (
    <div className="h-16 px-8 flex justify-between items-center bg-slate-900 text-slate-100 dark:bg-slate-700">
      <NavigationMenu>
        <NavigationMenuList className="space-x-4">
          <NavigationMenuItem>
            <NavigationMenuLink href="/" className="flex gap-1">
              <AudioWaveform />
              <span className="hidden sm:inline">Home</span>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavigationMenuItem className="hidden md:block">
                <NavigationMenuLink href="/" className="flex gap-1">
                  Play together <Info />
                </NavigationMenuLink>
              </NavigationMenuItem>
            </TooltipTrigger>
            <TooltipContent>
              <p>Coming soon!!!</p>
            </TooltipContent>
          </Tooltip>
          {isClient && address && (
            <NavigationMenuItem>
              <NavigationMenuLink
                href={`/address/${address}`}
                className="flex gap-1"
              >
                My chords
              </NavigationMenuLink>
            </NavigationMenuItem>
          )}
          <NavigationMenuItem>
            <NavigationMenuLink href="/create">
              <Button>
                <PencilRuler />
                <span className="ml-2 hidden md:inline">Post your chord</span>
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="ml-auto flex">
        <w3m-button balance={isMedium ? "show" : "hide"} />
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => darkMode.toggle()}
              className="appearance-none ml-2"
            >
              {darkMode.isDarkMode ? (
                <Moon className="fill-yellow-500 text-yellow-500" />
              ) : (
                <Sun className="text-white" />
              )}
            </button>
          </TooltipTrigger>

          <TooltipContent>
            Switch to{" "}
            <strong>{darkMode.isDarkMode ? "Light" : "Dark"} mode</strong>
          </TooltipContent>
        </Tooltip>
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={`${ETHERSCAN_URL}/address/${CHORDCHAIN_GOERLI_CONTRACT}`}
            target="_blank"
          >
            <Button
              size={"icon"}
              variant={"ghost"}
              className="rounded-full ml-2"
            >
              <ReceiptText />
            </Button>
          </Link>
        </TooltipTrigger>

        <TooltipContent>Contract</TooltipContent>
      </Tooltip>

      <Link
        href="https://github.com/thanhhoa214/learning/tree/main/alchemy-university-web3/chordchain"
        target="_blank"
      >
        <Button size={"icon"} variant={"ghost"} className="rounded-full ml-2">
          <Github />
        </Button>
      </Link>
    </div>
  );
}
