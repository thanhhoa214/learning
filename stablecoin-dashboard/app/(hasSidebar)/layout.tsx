import React from "react";
import Sidenav from "../components/Sidenav";

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex h-screen">
      <Sidenav />
      <main className="w-full bg-slate-100 overflow-auto">{children}</main>
    </div>
  );
}
