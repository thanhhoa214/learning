import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "../lib/utils";
import PageHeader from "@/components/molecules/PageHeader";
import { Toaster } from "@/components/ui/toaster";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "EduViet",
  description: "eLMS for composing questions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div className="min-h-screen w-full">
          <div className="flex flex-col">
            <PageHeader />
            {children}
          </div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
