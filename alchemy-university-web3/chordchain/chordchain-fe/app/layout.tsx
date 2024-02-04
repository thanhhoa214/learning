import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui2/Navbar";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chordchain",
  description: "Earn from your chord contribution",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <TooltipProvider>
        <body className={cn(inter.className)}>
          <Navbar />
          {children}
        </body>
      </TooltipProvider>
      <Toaster />
    </html>
  );
}
