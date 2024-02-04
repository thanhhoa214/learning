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
  AudioLines,
  AudioWaveform,
  Info,
  Loader,
  LogOut,
  PencilRuler,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { metaMask, hooks } from "@/lib/web3-connectors";
import { useCopyToClipboard, useMediaQuery } from "usehooks-ts";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const { useAccounts, useIsActivating, useIsActive } = hooks;

function shortenAddress(address: string, charsToShow: number = 6): string {
  if (!address) {
    return "";
  }

  const startChars = address.slice(0, charsToShow);
  const endChars = address.slice(-charsToShow);

  return `${startChars}...${endChars}`;
}

export default function Navbar() {
  const accounts = useAccounts();
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  const isNotMobile = useMediaQuery("(min-width: 640px)");
  const [, copy] = useCopyToClipboard();

  const handleClickToCopy = async () => {
    if (!accounts || !accounts[0]) return;
    await copy(accounts[0].toString());
    toast("✅ Your address has been copied!");
  };

  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug("Failed to connect eagerly to metamask");
    });
  }, []);

  return (
    <div className="px-8 py-4 flex justify-between">
      <NavigationMenu>
        <NavigationMenuList className="space-x-4">
          <NavigationMenuItem>
            <NavigationMenuLink href="/">
              <AudioWaveform /> Home
            </NavigationMenuLink>
          </NavigationMenuItem>
          <Tooltip>
            <TooltipTrigger asChild>
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className="flex gap-1">
                  Play together <Info />
                </NavigationMenuLink>
              </NavigationMenuItem>
            </TooltipTrigger>
            <TooltipContent>
              <p>Coming soon!!!</p>
            </TooltipContent>
          </Tooltip>
          <NavigationMenuItem>
            <NavigationMenuLink href="/create">
              <Button>
                <PencilRuler className="mr-2" /> Post your chord
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {accounts && accounts[0] ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size={"icon"}
              className="normal-case outline-4 outline-double outline-primary group"
            >
              <AudioLines />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={8} collisionPadding={8}>
            <DropdownMenuLabel>Wallet</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleClickToCopy}>
              <Wallet className="group-hover:-rotate-12 transition-transform" />{" "}
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-pointer ml-2">
                    {shortenAddress(accounts[0])}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to copy</p>
                </TooltipContent>
              </Tooltip>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500 hover:!text-red-600 cursor-pointer"
              onClick={() => metaMask.deactivate?.()}
            >
              {isActivating ? <Loader className="animate-spin" /> : <LogOut />}
              <span className=" ml-2">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button
          onClick={() => metaMask.activate()}
          size={!isNotMobile ? "icon" : "default"}
          className="normal-case outline-4 outline-double outline-primary group"
        >
          <Wallet className="group-hover:-rotate-12 transition-transform" />{" "}
          <span className="hidden sm:inline-block ml-2">Connect Wallet</span>
        </Button>
      )}
    </div>
  );
}
