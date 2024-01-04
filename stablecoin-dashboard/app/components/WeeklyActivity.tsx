import React from "react";
import { Card, Flex, Typography } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { DashboardGetResponse } from "../api/dashboard/route";
import { format } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
  scales: {
    x: {
      border: { dash: [2, 4] },
      ticks: { color: "rgb(148, 163, 184)" },
    },
    y: {
      border: { dash: [2, 4] },
      ticks: { color: "rgb(148, 163, 184)" },
    },
  },
};

interface WeeklyActivityProps {
  weeklyActivity: DashboardGetResponse["weeklyActivity"];
}

export function WeeklyActivity({ weeklyActivity }: WeeklyActivityProps) {
  const labels = weeklyActivity.map((entry) => format(entry.date, "EEEE"));

  const data: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "Issuance",
        data: weeklyActivity.map((a) => Math.abs(a.numbers.issuance)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderWidth: 0,
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
      },
      {
        label: "Redemption",
        data: weeklyActivity.map((a) => Math.abs(a.numbers.redemption)),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        borderWidth: 0,
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
      },
      {
        label: "Transfer",
        data: weeklyActivity.map((a) => Math.abs(a.numbers.transfer)),
        backgroundColor: "rgba(53, 235, 162, 0.5)",
        borderWidth: 0,
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
