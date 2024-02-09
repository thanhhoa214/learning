"use client";
import React, { useEffect } from "react";
import { useDarkMode } from "usehooks-ts";

export default function DarkModeProvider({
  children,
}: React.PropsWithChildren) {
  const { isDarkMode } = useDarkMode({ initializeWithValue: false });
  useEffect(() => {
    const func = isDarkMode ? "add" : ("remove" as const);
    document.documentElement.classList[func]("dark");
  }, [isDarkMode]);

  return children;
}
