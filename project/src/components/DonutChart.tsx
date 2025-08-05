import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  income: number;
  expense: number;
  balance: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ income, expense, balance }) => {
  const data = {
    labels: ['Total Income', 'Total Expenses', 'Total Balance'],
    datasets: [
      {
        data: [income, expense, balance],
        backgroundColor: [
          '#10b981', // green for income
          '#ef4444', // red for expenses  
          '#8b5cf6', // purple for balance
        ],
        borderColor: [
          '#10b981',
          '#ef4444', 
          '#8b5cf6',
        ],
        borderWidth: 0,
        cutout: '70%',
        spacing: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderWidth: 0,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            const value = new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              minimumFractionDigits: 0,
            }).format(context.parsed);
            return `${context.label}: ${value}`;
          },
        },
      },
    },
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Financial Overview</h3>
      
      <div className="relative">
        <div className="h-64 relative">
          <Doughnut data={data} options={options} />
          
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-sm text-gray-500 mb-1">Total Balance</p>
            <p className="text-2xl font-bold text-gray-900">{formatAmount(balance)}</p>
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-sm font-medium text-gray-700">Total Balance</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">{formatAmount(balance)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm font-medium text-gray-700">Total Expenses</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">{formatAmount(expense)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium text-gray-700">Total Income</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">{formatAmount(income)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;