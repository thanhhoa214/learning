"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { useDarkMode } from "usehooks-ts";

export default function DarkModeProvider({
  children,
}: React.PropsWithChildren) {
  const darkMode = useDarkMode({ initializeWithValue: false });

  return (
    <div
      className={cn(
        "bg-background text-foreground",
        darkMode.isDarkMode ? "dark" : "light"
      )}
    >
      {children}
    </div>
  );
}
