import React from 'react';
import { Wallet, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { FinancialData } from '../types/User';

interface FinancialSummaryProps {
  data: FinancialData;
  onAddTransaction: (type: 'income' | 'expense') => void;
}

const FinancialSummary: React.FC<FinancialSummaryProps> = ({ data, onAddTransaction }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Balance */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <Wallet className="w-6 h-6" />
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm">Total Balance</p>
            <p className="text-2xl font-bold">{formatCurrency(data.totalBalance)}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-1000"
              style={{ width: '75%' }}
            />
          </div>
          <span className="text-sm text-blue-100">+12%</span>
        </div>
      </div>

      {/* Income */}
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <button
            onClick={() => onAddTransaction('income')}
            className="p-2 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4 text-green-600" />
          </button>
        </div>
        <div className="mb-4">
          <p className="text-gray-500 text-sm mb-1">Total Income</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(data.totalIncome)}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">+8.2%</span>
          </div>
          <span className="text-gray-500 text-sm">vs last month</span>
        </div>
      </div>

      {/* Expenses */}
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl">
            <TrendingDown className="w-6 h-6 text-white" />
          </div>
          <button
            onClick={() => onAddTransaction('expense')}
            className="p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4 text-red-600" />
          </button>
        </div>
        <div className="mb-4">
          <p className="text-gray-500 text-sm mb-1">Total Expenses</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(data.totalExpense)}</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-red-600">
            <TrendingDown className="w-4 h-4" />
            <span className="text-sm font-medium">-3.1%</span>
          </div>
          <span className="text-gray-500 text-sm">vs last month</span>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;