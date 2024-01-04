"use client";
import React, { useState } from "react";
import {
  AppstoreOutlined,
  HomeFilled,
  SettingFilled,
  AccountBookFilled,
  UserOutlined,
  BellFilled,
  WalletFilled,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Badge, Button, Flex, Menu, Space, Typography } from "antd";
import { usePathname, useRouter } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode
): MenuItem {
  return {
    key,
    icon,
    label,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Dashboard", "dashboard", <HomeFilled />),
  getItem("Transactions", "transactions", <AppstoreOutlined />),
  getItem("Accounts", "accounts", <AccountBookFilled />),
  getItem("Web3", "web3", <WalletFilled />),
  { type: "divider" },
  getItem("Setting", "setting", <SettingFilled />),
];

export default function Sidenav() {
  const router = useRouter();
  const path = usePathname().slice(1);

  const onClick: MenuProps["onClick"] = (e) => {
    router.push(`/${e.key}`);
  };

  return (
    <Flex className="w-52 shrink-0 bg-white" vertical>
      <Typography.Title level={4} className="px-4 py-2 text-black font-bold">
        Stablize
      </Typography.Title>
      <Menu onClick={onClick} defaultSelectedKeys={[path]} items={items} />

      <Space direction="vertical" className="m-2 mt-auto">
        <Button type="primary" size="large" className="w-full">
          Complete KYC 🚀
        </Button>
        <Button
          type="text"
          icon={<Avatar icon={<UserOutlined />} />}
          className="!h-12 w-full"
        >
          <span className="w-16 text-ellipsis text-left mr-2">Rin Nguyen</span>
          <Badge count={5} size="small" showZero>
            <BellFilled className="ml-4 mt-1 -mb-1 text-lg" />
          </Badge>
        </Button>
      </Space>
    </Flex>
  );
}
