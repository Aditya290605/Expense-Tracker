import React from 'react';
import { Download, TrendingUp, TrendingDown, Calendar, PieChart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import DonutChart from '../components/DonutChart';
import AreaChart from '../components/AreaChart';

const Report: React.FC = () => {
  const { dashboardStats, transactions } = useApp();

  // Mock data for reports
  const monthlyData = [
    { day: 'Jan', amount: 45000 },
    { day: 'Feb', amount: 52000 },
    { day: 'Mar', amount: 48000 },
    { day: 'Apr', amount: 55000 },
    { day: 'May', amount: 51000 },
    { day: 'Jun', amount: 58000 },
  ];

  const expenseData = [
    { day: 'Jan', amount: 35000 },
    { day: 'Feb', amount: 42000 },
    { day: 'Mar', amount: 38000 },
    { day: 'Apr', amount: 45000 },
    { day: 'May', amount: 41000 },
    { day: 'Jun', amount: 48000 },
  ];

  const incomeTransactions = transactions.filter(t => t.type === 'income');
  const expenseTransactions = transactions.filter(t => t.type === 'expense');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Financial Reports</h1>
          <p className="text-gray-600">Comprehensive analysis of your financial data and spending patterns.</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
          <Download className="w-5 h-5" />
          Download Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <PieChart className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-700">Total Transactions</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{transactions.length}</div>
          <div className="text-gray-500 text-sm">This Month</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-700">Income Transactions</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{incomeTransactions.length}</div>
          <div className="text-gray-500 text-sm">Total Count</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="font-medium text-gray-700">Expense Transactions</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{expenseTransactions.length}</div>
          <div className="text-gray-500 text-sm">Total Count</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-700">Savings Rate</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {((dashboardStats.totalBalance / dashboardStats.totalIncome) * 100).toFixed(1)}%
          </div>
          <div className="text-gray-500 text-sm">Of Income</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <DonutChart
            income={dashboardStats.totalIncome}
            expense={dashboardStats.totalExpense}
            balance={dashboardStats.totalBalance}
          />
        </div>
        <div className="lg:col-span-2">
          <AreaChart 
            data={monthlyData} 
            type="income" 
            title="Monthly Income Trend"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AreaChart 
          data={expenseData} 
          type="expense" 
          title="Monthly Expense Trend"
        />
        
        {/* Financial Health Score */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Financial Health Score</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Savings Rate</span>
                <span className="text-sm font-semibold text-green-600">Excellent</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Expense Control</span>
                <span className="text-sm font-semibold text-blue-600">Good</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Income Stability</span>
                <span className="text-sm font-semibold text-purple-600">Very Good</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-purple-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2">Overall Score: 78/100</h4>
              <p className="text-sm text-gray-600">
                Your financial health is good! Consider increasing your savings rate and diversifying your income sources.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;