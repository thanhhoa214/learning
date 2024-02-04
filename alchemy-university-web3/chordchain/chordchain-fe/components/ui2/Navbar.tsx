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
import { Info, PencilRuler } from "lucide-react";

export default function Navbar() {
  return (
    <NavigationMenu className="px-8 py-4">
      <NavigationMenuList className="space-x-4">
        <NavigationMenuItem>
          <NavigationMenuLink href="/">Home</NavigationMenuLink>
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
  );
}
