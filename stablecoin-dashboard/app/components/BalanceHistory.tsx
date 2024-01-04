import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ScriptableContext,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const options: ChartOptions<"line"> = {
  maintainAspectRatio: false,
  responsive: true,
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
  elements: {
    line: { tension: 0.35 },
    point: { radius: 0 },
  },
  plugins: {
    filler: {
      propagate: false,
    },
    legend: { display: false },
  },
  interaction: {
    intersect: true,
  },
};

export default function BalanceHistory() {
  const data = () => {
    return {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jun",
        "Jun",
        "Jun",
        "Jun",
      ],
      datasets: [
        {
          label: "First dataset",
          data: [33, 53, 85, 41, 44, 65, 80, 50, 80, 70],
          fill: "start",
          backgroundColor: (context: ScriptableContext<"line">) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 200);
            gradient.addColorStop(0, "#1677ff80");
            gradient.addColorStop(1, "#ffffff00");
            return gradient;
          },
          borderColor: "#1677ff",
        },
      ],
    };
  };

  return <Line height={240} options={options} data={data()} />;
}
