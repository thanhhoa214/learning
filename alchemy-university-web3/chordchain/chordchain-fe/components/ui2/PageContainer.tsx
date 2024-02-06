import React from "react";

export default function PageContainer({ children }: React.PropsWithChildren) {
  return <main className="min-h-screen p-8">{children}</main>;
}
