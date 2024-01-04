"use client";
import { Avatar, Button, Flex, InputNumber, Select, Space } from "antd";
import React, { useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { cn } from "@/lib/utils";

const transactions = [
  { user: "Livia", company: "Bitget", amount: 1050 },
  { user: "Randy", company: "Coinhako", amount: 700 },
  { user: "Kowan", company: "Binance", amount: 500 },
];

export default function QuickTransfer() {
  const [selectedUser, setSelectedUser] = useState<
    (typeof transactions)[0] | null
  >(null);

  return (
    <Flex vertical>
      <div className="overflow-auto mb-2">
        <Space>
          {transactions.map((trans) => (
            <Flex
              vertical
              align="center"
              key={trans.user}
              className={cn(
                "cursor-pointer rounded-xl w-20 py-2",
                selectedUser?.user === trans.user && "bg-blue-200"
              )}
              onClick={() => setSelectedUser(trans)}
            >
              <Avatar>{trans.user}</Avatar>
              <strong className="mt-1">{trans.user}</strong>
              <p className="text-xs text-slate-600 -mt-1">{trans.company}</p>
            </Flex>
          ))}
        </Space>
      </div>
      <Space direction="vertical" className="w-full">
        <Input placeholder="Note" />
        <Flex gap={8}>
          <Select
            value={"usdt"}
            options={[
              { value: "usdt", label: "USDT" },
              { value: "usdc", label: "USDC" },
            ]}
            className="w-24"
          />
          <InputNumber placeholder="Amount" className="flex-grow" />{" "}
          <Button
            icon={<SendOutlined />}
            disabled={!selectedUser}
            type="primary"
          ></Button>
        </Flex>
      </Space>
    </Flex>
  );
}
