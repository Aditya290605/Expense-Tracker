import React, { useState } from 'react';
import Navbar from './Navbar';
import SlidingPanel from './SlidingPanel';
import { User, mockFinancialData } from '../types/User';
import { AppPage } from '../App';
import { BarChart3, TrendingUp, TrendingDown, Download, Calendar, Filter } from 'lucide-react';

interface ReportsPageProps {
  user: User | null;
  onNavigate: (page: AppPage) => void;
  onLogout: () => void;
}

const ReportsPage: React.FC<ReportsPageProps> = ({ user, onNavigate, onLogout }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate savings rate
  const savingsRate = ((mockFinancialData.totalIncome - mockFinancialData.totalExpense) / mockFinancialData.totalIncome) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        user={user} 
        onMenuClick={() => setIsPanelOpen(true)} 
        onLogout={onLogout}
      />
      
      <SlidingPanel 
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onNavigate={onNavigate}
        currentPage="reports"
      />

      <div className="pt-16 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Reports</h1>
              <p className="text-gray-600">Detailed insights into your financial performance</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1month">Last Month</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">Net Income</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-2">
                {formatCurrency(mockFinancialData.totalBalance)}
              </p>
              <p className="text-sm text-green-600">+12.5% vs last period</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">Savings Rate</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-2">
                {savingsRate.toFixed(1)}%
              </p>
              <p className="text-sm text-blue-600">Excellent performance</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">Avg. Daily Spend</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-2">
                {formatCurrency(mockFinancialData.totalExpense / 30)}
              </p>
              <p className="text-sm text-purple-600">Within budget</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                  <TrendingDown className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">Expense Ratio</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-2">
                {((mockFinancialData.totalExpense / mockFinancialData.totalIncome) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-orange-600">Well controlled</p>
            </div>
          </div>

          {/* Income vs Expense Comparison */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Income vs Expense Trend</h3>
            <div className="space-y-6">
              {mockFinancialData.monthlyData.map((item, index) => {
                const maxValue = Math.max(item.income, item.expense);
                const incomePercentage = (item.income / maxValue) * 100;
                const expensePercentage = (item.expense / maxValue) * 100;
                
                return (
                  <div key={item.month} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{item.month}</span>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-green-600">Income: {formatCurrency(item.income)}</span>
                        <span className="text-red-600">Expense: {formatCurrency(item.expense)}</span>
                      </div>
                    </div>
                    
                    {/* Income Bar */}
                    <div className="relative">
                      <div className="h-4 bg-gray-100 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-lg transition-all duration-1000"
                          style={{ 
                            width: `${incomePercentage}%`,
                            animationDelay: `${index * 200}ms`
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Expense Bar */}
                    <div className="relative">
                      <div className="h-4 bg-gray-100 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-lg transition-all duration-1000"
                          style={{ 
                            width: `${expensePercentage}%`,
                            animationDelay: `${index * 200 + 100}ms`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Monthly Summary Table */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Monthly Summary</h3>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Month</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Income</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Expense</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Net</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Savings Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {mockFinancialData.monthlyData.map((item, index) => {
                    const net = item.income - item.expense;
                    const savingsRate = (net / item.income) * 100;
                    
                    return (
                      <tr key={item.month} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-medium text-gray-900">{item.month}</td>
                        <td className="py-3 px-4 text-right text-green-600 font-semibold">
                          {formatCurrency(item.income)}
                        </td>
                        <td className="py-3 px-4 text-right text-red-600 font-semibold">
                          {formatCurrency(item.expense)}
                        </td>
                        <td className={`py-3 px-4 text-right font-semibold ${net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(net)}
                        </td>
                        <td className={`py-3 px-4 text-right font-semibold ${savingsRate >= 20 ? 'text-green-600' : savingsRate >= 10 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {savingsRate.toFixed(1)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;