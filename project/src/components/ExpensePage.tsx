import React, { useState } from 'react';
import Navbar from './Navbar';
import SlidingPanel from './SlidingPanel';
import AddTransactionModal from './AddTransactionModal';
import { User, mockFinancialData } from '../types/User';
import { AppPage } from '../App';
import { TrendingDown, Plus, Calendar, Filter, ShoppingCart, Home, Car, Gamepad2, Zap, ShoppingBag, Heart } from 'lucide-react';
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

interface ExpensePageProps {
  user: User | null;
  onNavigate: (page: AppPage) => void;
  onLogout: () => void;
}

const ExpensePage: React.FC<ExpensePageProps> = ({ user, onNavigate, onLogout }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const expenseTransactions = mockFinancialData.transactions.filter(t => t.type === 'expense');
  const totalExpense = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Category breakdown
  const categoryTotals = expenseTransactions.reduce((acc, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {} as Record<string, number>);

  const categoryData = Object.entries(categoryTotals).map(([category, amount]) => ({
    category,
    amount,
    percentage: (amount / totalExpense) * 100
  })).sort((a, b) => b.amount - a.amount);

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, any> = {
      'Groceries': ShoppingCart,
      'Rent': Home,
      'Transportation': Car,
      'Entertainment': Gamepad2,
      'Utilities': Zap,
      'Shopping': ShoppingBag,
      'Healthcare': Heart
    };
    return icons[category] || ShoppingBag;
  };

  const getCategoryColor = (category: string, index: number) => {
    const colors = [
      'from-red-500 to-red-600',
      'from-orange-500 to-orange-600',
      'from-yellow-500 to-yellow-600',
      'from-purple-500 to-purple-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
      'from-blue-500 to-blue-600'
    ];
    return colors[index % colors.length];
  };

  // Monthly expense data for chart
  const monthlyExpenseData = mockFinancialData.monthlyData.map(d => ({
    month: d.month,
    amount: d.expense
  }));

  const maxMonthlyExpense = Math.max(...monthlyExpenseData.map(d => d.amount));

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
        currentPage="expense"
      />

      <div className="pt-16 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Expense Overview</h1>
              <p className="text-gray-600">Track and analyze your spending patterns</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Expense</span>
            </button>
          </div>

          {/* Expense Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <TrendingDown className="w-6 h-6" />
                </div>
                <span className="text-red-100 text-sm">This Month</span>
              </div>
              <p className="text-3xl font-bold mb-2">{formatCurrency(totalExpense)}</p>
              <p className="text-red-100">-3.1% vs last month</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-gray-600 text-sm mb-2">Average Daily</h3>
              <p className="text-2xl font-bold text-gray-900 mb-2">
                {formatCurrency(totalExpense / 30)}
              </p>
              <p className="text-orange-600 text-sm">Daily spending</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-gray-600 text-sm mb-2">Categories</h3>
              <p className="text-2xl font-bold text-gray-900 mb-2">{categoryData.length}</p>
              <p className="text-purple-600 text-sm">Spending areas</p>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Expense Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryData.map((item, index) => {
                const Icon = getCategoryIcon(item.category);
                const colorClass = getCategoryColor(item.category, index);
                
                return (
                  <div key={item.category} className="p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${colorClass}`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.category}</p>
                        <p className="text-sm text-gray-500">{item.percentage.toFixed(1)}% of total</p>
                      </div>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{formatCurrency(item.amount)}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Monthly Expense Chart */}
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

          {/* Expense Transactions */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Expense Transactions</h3>
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Filter className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <Calendar className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {expenseTransactions.map((transaction, index) => {
                const Icon = getCategoryIcon(transaction.category);
                
                return (
                  <div
                    key={transaction.id}
                    className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="p-3 bg-red-100 rounded-xl">
                      <Icon className="w-6 h-6 text-red-600" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{transaction.category}</p>
                          <p className="text-sm text-gray-500">{transaction.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-red-600">
                            -{formatCurrency(transaction.amount)}
                          </p>
                          <div className="flex items-center space-x-1 text-gray-400">
                            <Calendar className="w-3 h-3" />
                            <span className="text-xs">{formatDate(transaction.date)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddModal && (
        <AddTransactionModal
          type="expense"
          onClose={() => setShowAddModal(false)}
          onSubmit={(data) => {
            console.log('Expense data:', data);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
};

export default ExpensePage;