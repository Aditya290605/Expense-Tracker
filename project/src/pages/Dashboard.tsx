import React, { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatCard from '../components/StatCard';
import DonutChart from '../components/DonutChart';
import AreaChart from '../components/AreaChart';
import RecentTransactions from '../components/RecentTransactions';
import TransactionModal from '../components/TransactionModal';

const Dashboard: React.FC = () => {
  const { dashboardStats, transactions, user } = useApp();
  const [modalOpen, setModalOpen] = useState<{ type: 'income' | 'expense' | null }>({ type: null });

  // Mock data for dashboard charts
  const recentExpenseData = [
    { day: 'Mon', amount: 2500 },
    { day: 'Tue', amount: 1800 },
    { day: 'Wed', amount: 3200 },
    { day: 'Thu', amount: 1500 },
    { day: 'Fri', amount: 4100 },
    { day: 'Sat', amount: 2800 },
    { day: 'Sun', amount: 1900 }
  ];

  const openModal = (type: 'income' | 'expense') => {
    setModalOpen({ type });
  };

  const closeModal = () => {
    setModalOpen({ type: null });
  };

  return (
    <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Here's your financial overview for this month
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => openModal('income')}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            Add Income
          </button>
          <button
            onClick={() => openModal('expense')}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            Add Expense
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Balance"
            amount={dashboardStats.totalBalance}
            icon={Wallet}
            type="balance"
          />
          <StatCard
            title="Total Income"
            amount={dashboardStats.totalIncome}
            change={dashboardStats.incomeChange}
            icon={TrendingUp}
            type="income"
          />
          <StatCard
            title="Total Expenses"
            amount={dashboardStats.totalExpense}
            change={dashboardStats.expenseChange}
            icon={TrendingDown}
            type="expense"
          />
        </div>

        {/* Charts and Transactions */}
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
              data={recentExpenseData} 
              type="expense" 
              title="Daily Expenses"
            />
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <RecentTransactions transactions={transactions} />
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Tips</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <h4 className="font-medium text-blue-900 mb-2">Save More</h4>
                <p className="text-blue-700 text-sm">
                  Try to save at least 20% of your income each month for emergencies and future goals.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <h4 className="font-medium text-green-900 mb-2">Track Expenses</h4>
                <p className="text-green-700 text-sm">
                  Review your spending patterns weekly to identify areas where you can cut costs.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl">
                <h4 className="font-medium text-purple-900 mb-2">Budget Planning</h4>
                <p className="text-purple-700 text-sm">
                  Create a monthly budget and stick to it. Allocate funds for necessities first.
                </p>
              </div>
            </div>
          </div>
        </div>

      {/* Transaction Modal */}
      {modalOpen.type && (
        <TransactionModal
          isOpen={true}
          onClose={closeModal}
          type={modalOpen.type}
        />
      )}
    </div>
  );
};

export default Dashboard;