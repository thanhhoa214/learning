import React from "react";
import { Button, Flex, Space, Spin } from "antd";
import { CaretUpFilled, CaretDownFilled } from "@ant-design/icons";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { DashboardGetResponse } from "../api/dashboard/route";

export default function RecentTransactions({
  transactions,
}: {
  transactions: DashboardGetResponse["topRecentTransactions"];
}) {
  return (
    <Space direction="vertical" size="middle" className="w-full">
      {transactions.map((trans) => (
        <Flex align="center" key={trans.id}>
          <Space>
            <Flex
              justify="center"
              align="center"
              className={cn(
                "border rounded-full w-8 h-8 text-lg",
                trans.amount > 0
                  ? "border-green-300 text-green-500"
                  : "border-red-300 text-red-500"
              )}
            >
              {trans.amount < 0 ? <CaretDownFilled /> : <CaretUpFilled />}
            </Flex>
            <div>
              <strong>{trans.transactionType}</strong>
              <p className="text-xs text-gray-600">
                {format(trans.createdAt, "EEEE, dd MMM yyyy")}
              </p>
            </div>
          </Space>

          <span
            className={cn(
              "ml-auto",
              trans.amount > 0 ? "text-green-500" : "text-red-500"
            )}
          >
            {trans.amount < 0 && "-"}$
            {Math.abs(Math.round((trans.amount + Number.EPSILON) * 100) / 100)}
          </span>
        </Flex>
      ))}
      <Button className="w-full" type="primary">
        View all
      </Button>
    </Space>
  );
}
