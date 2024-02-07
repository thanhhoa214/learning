import { cn } from "@/lib/utils";
import React from "react";

export default function PageContainer({
  children,
  className,
}: React.PropsWithChildren & { className?: string }) {
  return (
    <main
      className={cn("p-8", className)}
      style={{ minHeight: "calc(100vh - 4rem)" }}
    >
      {children}
    </main>
  );
}
