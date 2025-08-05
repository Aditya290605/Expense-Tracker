import React, { useState } from 'react';
import { Plus, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AreaChart from '../components/AreaChart';
import TransactionModal from '../components/TransactionModal';
import RecentTransactions from '../components/RecentTransactions';

const Income: React.FC = () => {
  const { transactions, dashboardStats } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  // Mock income data for the chart
  const incomeData = [
    { day: '2nd Jul', amount: 20000 },
    { day: '3rd Jul', amount: 15000 },
    { day: '4th Jul', amount: 8000 },
    { day: '5th Jul', amount: 5000 },
    { day: '6th Jul', amount: 3000 },
    { day: '7th Jul', amount: 2000 },
    { day: '8th Jul', amount: 1000 },
  ];

  const incomeTransactions = transactions.filter(t => t.type === 'income');

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Income Overview</h1>
          <p className="text-gray-600">Track your income trends over time and gain insights into your earnings.</p>
        </div>
        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          Add Income
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-xs font-medium px-2 py-1 rounded-full bg-green-400/20">
              +{dashboardStats.incomeChange.toFixed(1)}%
            </div>
          </div>
          <div className="text-2xl font-bold mb-1">
            ₹{dashboardStats.totalIncome.toLocaleString('en-IN')}
          </div>
          <div className="text-green-100 text-sm">Total Income</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-700">This Month</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            ₹{(dashboardStats.totalIncome * 0.8).toLocaleString('en-IN')}
          </div>
          <div className="text-gray-500 text-sm">Monthly Income</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-700">Average</h3>
          </div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            ₹{Math.round(dashboardStats.totalIncome / incomeTransactions.length || 0).toLocaleString('en-IN')}
          </div>
          <div className="text-gray-500 text-sm">Per Transaction</div>
        </div>
      </div>

      {/* Chart */}
      <AreaChart 
        data={incomeData} 
        type="income" 
        title="Income Overview"
      />

      {/* Recent Income Transactions */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RecentTransactions transactions={incomeTransactions} />
        
        {/* Income Categories */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Income Categories</h3>
          <div className="space-y-4">
            {['Salary', 'Freelance', 'Investment', 'Business'].map((category, index) => {
              const amount = [45000, 5000, 2000, 3000][index];
              const percentage = (amount / dashboardStats.totalIncome) * 100;
              
              return (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      ['bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-orange-500'][index]
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
          type="income"
        />
      )}
    </div>
  );
};

export default Income;