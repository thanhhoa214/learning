import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "../lib/utils";
import PageHeader from "@/components/molecules/PageHeader";
import Sidenav from "@/components/molecules/Sidenav";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "EduViet",
  description: "eLMS for composing questions",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
          <Sidenav />
          <div className="flex flex-col">
            <PageHeader />
            {children}
            {modal}
          </div>
        </div>
      </body>
    </html>
  );
}
