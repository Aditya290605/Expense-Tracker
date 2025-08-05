import React, { useState } from 'react';
import Navbar from './Navbar';
import SlidingPanel from './SlidingPanel';
import AddTransactionModal from './AddTransactionModal';
import { User, mockFinancialData } from '../types/User';
import { AppPage } from '../App';
import { TrendingUp, Plus, Calendar, Filter } from 'lucide-react';

interface IncomePageProps {
  user: User | null;
  onNavigate: (page: AppPage) => void;
  onLogout: () => void;
}

const IncomePage: React.FC<IncomePageProps> = ({ user, onNavigate, onLogout }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const incomeTransactions = mockFinancialData.transactions.filter(t => t.type === 'income');
  const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);

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

  // Monthly income data for chart
  const monthlyIncomeData = mockFinancialData.monthlyData.map(d => ({
    month: d.month,
    amount: d.income
  }));

  const maxMonthlyIncome = Math.max(...monthlyIncomeData.map(d => d.amount));

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
        currentPage="income"
      />

      <div className="pt-16 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Income Overview</h1>
              <p className="text-gray-600">Track and manage your income sources</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Income</span>
            </button>
          </div>

          {/* Income Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-green-100 text-sm">This Month</span>
              </div>
              <p className="text-3xl font-bold mb-2">{formatCurrency(totalIncome)}</p>
              <p className="text-green-100">+8.2% vs last month</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-gray-600 text-sm mb-2">Average Monthly</h3>
              <p className="text-2xl font-bold text-gray-900 mb-2">
                {formatCurrency(monthlyIncomeData.reduce((sum, d) => sum + d.amount, 0) / monthlyIncomeData.length)}
              </p>
              <p className="text-green-600 text-sm">Consistent growth</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-gray-600 text-sm mb-2">Income Sources</h3>
              <p className="text-2xl font-bold text-gray-900 mb-2">{incomeTransactions.length}</p>
              <p className="text-blue-600 text-sm">Active sources</p>
            </div>
          </div>

          {/* Income Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Income Trend</h3>
            <div className="space-y-4">
              {monthlyIncomeData.map((item, index) => {
                const percentage = (item.amount / maxMonthlyIncome) * 100;
                
                return (
                  <div key={item.month} className="flex items-center space-x-4">
                    <div className="w-16 text-sm font-medium text-gray-600">{item.month}</div>
                    <div className="flex-1 relative">
                      <div className="h-10 bg-gray-100 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-lg transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                          style={{ 
                            width: `${percentage}%`,
                            animationDelay: `${index * 150}ms`
                          }}
                        >
                          <span className="text-white text-sm font-medium">
                            {formatCurrency(item.amount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Income Transactions */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Income Transactions</h3>
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
              {incomeTransactions.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-3 bg-green-100 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{transaction.category}</p>
                        <p className="text-sm text-gray-500">{transaction.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600">
                          +{formatCurrency(transaction.amount)}
                        </p>
                        <div className="flex items-center space-x-1 text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span className="text-xs">{formatDate(transaction.date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Income Modal */}
      {showAddModal && (
        <AddTransactionModal
          type="income"
          onClose={() => setShowAddModal(false)}
          onSubmit={(data) => {
            console.log('Income data:', data);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
};

export default IncomePage;