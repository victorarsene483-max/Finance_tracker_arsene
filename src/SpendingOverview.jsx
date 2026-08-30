import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";
import "./SpendingOverview.css";

const SPENDING_DATA = [
  { date: "May 1", amount: 3200 },
  { date: "May 3", amount: 5800 },
  { date: "May 6", amount: 6400 },
  { date: "May 9", amount: 4100 },
  { date: "May 11", amount: 4800 },
  { date: "May 14", amount: 3000 },
  { date: "May 16", amount: 2400 },
  { date: "May 19", amount: 4500 },
  { date: "May 21", amount: 6200 },
  { date: "May 24", amount: 3800 },
  { date: "May 26", amount: 2200 },
  { date: "May 29", amount: 5000 },
  { date: "May 31", amount: 6800 },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="spending-tooltip">
      <p className="tooltip-date">{label}</p>
      <p className="tooltip-amount">KSh {payload[0].value.toLocaleString()}</p>
    </div>
  );
}

function SpendingOverview() {
  const [range, setRange] = useState("This Month");

  return (
    <div className="spending-overview">
      <div className="spending-header">
        <h2>Spending Overview</h2>
        <button className="range-select">
          {range}
          <ChevronDown size={16} />
        </button>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={SPENDING_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="spendingFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1f7a4d" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#1f7a4d" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            interval="preserveStartEnd"
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            tickFormatter={(value) => `${value / 1000}K`}
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#1f7a4d"
            strokeWidth={2.5}
            fill="url(#spendingFill)"
            dot={{ r: 4, stroke: "#1f7a4d", strokeWidth: 2, fill: "#ffffff" }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingOverview;