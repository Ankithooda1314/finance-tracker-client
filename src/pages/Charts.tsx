import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { api } from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#ef4444",
  "#3b82f6",
  "#f59e0b",
  "#a855f7",
  "#14b8a6",
];

export default function Charts() {
  const [data, setData] = useState<any[]>([]);
  const month = localStorage.getItem("month") || "January";

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get("/transactions");
      setData(res.data);
    };
    fetch();
  }, []);

  const filtered = data.filter((tx) => tx.month === month);

  // Expense category breakdown
  const categoryMap: any = {};

  filtered
    .filter((tx) => tx.type === "expense")
    .forEach((tx) => {
      if (!categoryMap[tx.category]) categoryMap[tx.category] = 0;
      categoryMap[tx.category] += tx.amount;
    });

  const pieData = Object.entries(categoryMap).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  // Monthly income vs expense
  const monthMap: any = {};

  data.forEach((tx) => {
    if (!monthMap[tx.month]) {
      monthMap[tx.month] = {
        month: tx.month,
        income: 0,
        expense: 0,
      };
    }

    if (tx.type === "income") {
      monthMap[tx.month].income += tx.amount;
    } else {
      monthMap[tx.month].expense += tx.amount;
    }
  });

  const barData = Object.values(monthMap);

  const totalExpense = pieData.reduce(
    (sum: number, d: any) => sum + d.value,
    0
  );

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">
        Analytics — {month}
      </h1>

      <div className="grid grid-cols-2 gap-6">
        {/* Donut */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="mb-4">Expense Breakdown</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={70}
                outerRadius={110}
                dataKey="value"
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          <p className="text-center mt-2 text-gray-400">
            Total Expense: ₹{totalExpense}
          </p>
        </div>

        {/* Bar */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="mb-4">Monthly Income vs Expense</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#22c55e" />
              <Bar dataKey="expense" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
}
