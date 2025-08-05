import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

// Sample Data - replace with your own dynamic data
const expenseData = [
  { date: "2nd Jul", amount: 20000 },
  { date: "3rd Jul", amount: 1200 },
  { date: "4th Jul", amount: 1100 },
  { date: "5th Jul", amount: 1300 },
];

interface ExpenseChartProps {
  data: { day: string; amount: number }[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ data }) => {
  const maxAmount = Math.max(...data.map(d => d.amount));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
  <div className="flex items-center justify-between mb-4">
    <h3 className="text-lg font-semibold text-gray-900">Expense Overview</h3>
    <button className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-lg font-medium hover:bg-green-200 transition">
      + Add Expense
    </button>
  </div>

  {/* Chart */}
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={expenseData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="date" stroke="#888888" />
      <YAxis stroke="#888888" />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="amount"
        stroke="#7c3aed"
        fillOpacity={1}
        fill="url(#colorExpense)"
        dot={{ r: 5 }}
        strokeWidth={3}
      />
    </AreaChart>
  </ResponsiveContainer>
</div>
  );
};

export default ExpenseChart;