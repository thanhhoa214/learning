import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui2/Navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

import { Web3Modal } from "../context/Web3Modal";
import DarkModeProvider from "@/components/ui2/DarkModeProvider";
import { SWRProvider } from "@/components/ui2/SWRProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chordchain",
  description: "Earn from your chord contribution",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <TooltipProvider>
        <Web3Modal>
          <SWRProvider>
            <body className={inter.className}>
              <DarkModeProvider>
                <Navbar />
                {children}
              </DarkModeProvider>
            </body>
          </SWRProvider>
        </Web3Modal>
      </TooltipProvider>
      <Toaster />
    </html>
  );
}
