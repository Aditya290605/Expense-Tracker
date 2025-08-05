import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

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

interface AreaChartProps {
  data: { day: string; amount: number }[];
  type: 'income' | 'expense';
  title: string;
}

const AreaChart: React.FC<AreaChartProps> = ({ data, type, title }) => {
  const chartData = {
    labels: data.map(item => item.day),
    datasets: [
      {
        label: type === 'income' ? 'Income' : 'Expense',
        data: data.map(item => item.amount),
        borderColor: type === 'income' ? '#10b981' : '#8b5cf6',
        backgroundColor: type === 'income' 
          ? 'rgba(16, 185, 129, 0.1)' 
          : 'rgba(139, 92, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: type === 'income' ? '#10b981' : '#8b5cf6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: type === 'income' ? '#10b981' : '#8b5cf6',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 3,
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
        borderColor: type === 'income' ? '#10b981' : '#8b5cf6',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `${type === 'income' ? 'Income' : 'Expense'}: ₹${context.parsed.y.toLocaleString('en-IN')}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
          },
          callback: function(value: any) {
            return '₹' + value.toLocaleString('en-IN');
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">Track your spending trends over time and gain insights into where your money goes.</p>
        </div>
        <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
          type === 'income' 
            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
            : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
        } transition-colors`}>
          + Add {type === 'income' ? 'Income' : 'Expense'}
        </button>
      </div>
      <div className="h-80">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default AreaChart;