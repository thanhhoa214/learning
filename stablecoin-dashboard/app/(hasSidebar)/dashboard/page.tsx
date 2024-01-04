"use client";
import { Col, Flex, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import BalanceHistory from "../../components/BalanceHistory";
import { WeeklyActivity } from "../../components/WeeklyActivity";
import RecentTransactions from "../../components/RecentTransactions";
import DashboardCard from "../../components/DashboardCard";
import QuickTransfer from "../../components/QuickTransfer";
import { DashboardGetResponse } from "../../api/dashboard/route";

export default function DashboardPage() {
  const [response, setResponse] = useState<DashboardGetResponse | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/dashboard");
        const data = await response.json();
        setResponse(data);
      } catch (error) {
        console.error("Error fetching recent transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  if (!response)
    return (
      <Flex justify="center" align="center" className="w-full h-full">
        <Spin />
      </Flex>
    );

  return (
    <div className="w-full p-4">
      <Row gutter={16} className="mb-4">
        <Col className="gutter-row" span={14}>
          <DashboardCard title="Balance History">
            <BalanceHistory />
          </DashboardCard>
        </Col>
        <Col span={10}>
          <DashboardCard title="Recent Transactions" className="h-full">
            <RecentTransactions transactions={response.topRecentTransactions} />
          </DashboardCard>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <DashboardCard title="Quick Transfer" className="h-full">
            <QuickTransfer />
          </DashboardCard>
        </Col>
        <Col span={12}>
          <DashboardCard title="Weekly Activity">
            <WeeklyActivity weeklyActivity={response.weeklyActivity} />
          </DashboardCard>
        </Col>
      </Row>
    </div>
  );
}
