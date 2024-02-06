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
import { AudioWaveform, Info, Moon, PencilRuler, Sun } from "lucide-react";
import { useDarkMode } from "usehooks-ts";

export default function Navbar() {
  const darkMode = useDarkMode({ initializeWithValue: false });

  return (
    <div className="px-8 py-4 flex justify-between bg-slate-900 text-slate-100 dark:bg-slate-700">
      <NavigationMenu>
        <NavigationMenuList className="space-x-4">
          <NavigationMenuItem>
            <NavigationMenuLink href="/" className="flex gap-1">
              <AudioWaveform />
              Home
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
            <NavigationMenuLink href="/" className="flex gap-1">
              My chords
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/create">
              <Button>
                <PencilRuler className="mr-2" /> Post your chord
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="ml-auto flex">
        <w3m-button />
        <Button
          size={"icon"}
          variant={"link"}
          onClick={() => darkMode.toggle()}
        >
          {darkMode.isDarkMode ? <Sun /> : <Moon />}
        </Button>
      </div>
    </div>
  );
}
