import React from "react";
import { Card, Flex, Typography } from "antd";
import { cn } from "@/lib/utils";

export default function DashboardCard({
  children,
  className,
  title,
}: React.PropsWithChildren & { title: string; className?: string }) {
  return (
    <Flex vertical className={cn("w-full", className)}>
      <Typography.Title level={4} className="ml-4">
        {title}
      </Typography.Title>
      <section className="h-full bg-white rounded-2xl p-6">{children}</section>
    </Flex>
  );
}
