import React from 'react';
import { FinancialData } from '../types/User';

interface PieChartProps {
  data: FinancialData;
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const total = data.totalIncome + data.totalExpense + data.totalBalance;
  const incomePercentage = (data.totalIncome / total) * 100;
  const expensePercentage = (data.totalExpense / total) * 100;
  const balancePercentage = (data.totalBalance / total) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Simple SVG pie chart using stroke-dasharray
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  
  const incomeStroke = (incomePercentage / 100) * circumference;
  const expenseStroke = (expensePercentage / 100) * circumference;
  const balanceStroke = (balancePercentage / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Financial Overview</h3>
      
      <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
        {/* Pie Chart */}
        <div className="relative">
          <svg width="200" height="200" className="transform -rotate-90">
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="20"
            />
            {/* Income Arc */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#10b981"
              strokeWidth="20"
              strokeDasharray={`${incomeStroke} ${circumference}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
            {/* Expense Arc */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#ef4444"
              strokeWidth="20"
              strokeDasharray={`${expenseStroke} ${circumference}`}
              strokeDashoffset={-incomeStroke}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
            {/* Balance Arc */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="20"
              strokeDasharray={`${balanceStroke} ${circumference}`}
              strokeDashoffset={-(incomeStroke + expenseStroke)}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(total)}
              </p>
              <p className="text-sm text-gray-500">Total</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-4 flex-1">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="font-medium text-gray-900">Income</span>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{formatCurrency(data.totalIncome)}</p>
              <p className="text-sm text-gray-500">{incomePercentage.toFixed(1)}%</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="font-medium text-gray-900">Expenses</span>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{formatCurrency(data.totalExpense)}</p>
              <p className="text-sm text-gray-500">{expensePercentage.toFixed(1)}%</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="font-medium text-gray-900">Balance</span>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">{formatCurrency(data.totalBalance)}</p>
              <p className="text-sm text-gray-500">{balancePercentage.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;