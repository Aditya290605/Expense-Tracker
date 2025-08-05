import React, { useState } from 'react';
import { Plus, TrendingDown, Calendar, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AreaChart from '../components/AreaChart';
import TransactionModal from '../components/TransactionModal';
import RecentTransactions from '../components/RecentTransactions';

const Expense: React.FC = () => {
  const { transactions, dashboardStats } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  // Mock expense data for the chart (matching the first image style)
  const expenseData = [
    { day: '2nd Jul', amount: 20000 },
    { day: '3rd Jul', amount: 18000 },
    { day: '4th Jul', amount: 15000 },
    { day: '5th Jul', amount: 10000 },
    { day: '6th Jul', amount: 5000 },
    { day: '7th Jul', amount: 2000 },
    { day: '8th Jul', amount: 1000 },
  ];

  const expenseTransactions = transactions.filter(t => t.type === 'expense');

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Expense Overview</h1>
          <p className="text-gray-600">Track your spending trends over time and gain insights into where your money goes.</p>
        </div>
        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Add Expense
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div className="text-xs font-medium px-2 py-1 rounded-full bg-red-400/20">
              {dashboardStats.expenseChange.toFixed(1)}%
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">
            ₹{dashboardStats.totalExpense.toLocaleString('en-IN')}
          </div>
          <div className="text-red-100 text-sm">Total Expenses</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-700">This Month</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            ₹{(dashboardStats.totalExpense * 0.9).toLocaleString('en-IN')}
          </div>
          <div className="text-gray-500 text-sm">Monthly Expenses</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-700">Average</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            ₹{Math.round(dashboardStats.totalExpense / expenseTransactions.length || 0).toLocaleString('en-IN')}
          </div>
          <div className="text-gray-500 text-sm">Per Transaction</div>
        </div>
      </div>

      {/* Chart */}
      <AreaChart 
        data={expenseData} 
        type="expense" 
        title="Expense Overview"
      />

      {/* Recent Expense Transactions */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RecentTransactions transactions={expenseTransactions} />
        
        {/* Expense Categories */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Expense Categories</h3>
          <div className="space-y-4">
            {['Rent', 'Groceries', 'Transportation', 'Entertainment'].map((category, index) => {
              const amount = [8000, 2500, 1200, 3000][index];
              const percentage = (amount / dashboardStats.totalExpense) * 100;
              
              return (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-pink-500'][index]
                    }`}></div>
                    <span className="font-medium text-gray-700">{category}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">₹{amount.toLocaleString('en-IN')}</div>
                    <div className="text-sm text-gray-500">{percentage.toFixed(1)}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Transaction Modal */}
      {modalOpen && (
        <TransactionModal
          isOpen={true}
          onClose={closeModal}
          type="expense"
        />
      )}
    </div>
  );
};

export default Expense;