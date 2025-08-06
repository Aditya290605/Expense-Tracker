import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import SlidingPanel from './SlidingPanel';
import AddTransactionModal from './AddTransactionModal';
import { User } from '../types/User';
import { AppPage } from '../App';
import { TrendingUp, Plus, Calendar, Filter } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { authService } from '../services/authService';
import LoadingSpinner from './LoadingSpinner';

interface IncomePageProps {
  user: User | null;
  onNavigate: (page: AppPage) => void;
  onLogout: () => void;
}

const IncomePage: React.FC<IncomePageProps> = ({ user, onNavigate, onLogout }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [income, setIncome] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const incomeData = await authService.getIncome();
        setIncome(incomeData);
      } catch (e) {
        setIncome([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const totalIncome = income.reduce((sum, t) => sum + (t.amount || 0), 0);
  const monthlyIncomeData = [];
  // You can aggregate monthly data here if needed

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner text="Loading..." /></div>;
  }

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
              <p className="text-green-100">+0% vs last month</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-gray-600 text-sm mb-2">Average Monthly</h3>
              <p className="text-2xl font-bold text-gray-900 mb-2">
                {formatCurrency(totalIncome)}
              </p>
              <p className="text-green-600 text-sm">Consistent growth</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-gray-600 text-sm mb-2">Income Sources</h3>
              <p className="text-2xl font-bold text-gray-900 mb-2">{income.length}</p>
              <p className="text-blue-600 text-sm">Active sources</p>
            </div>
          </div>
          {/* Income Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Income Overview</h3>
              <button className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-lg font-medium hover:bg-green-200 transition">
                + Add Income
              </button>
            </div>
            {/* Chart - Placeholder, you can aggregate data for chart */}
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={income.map(i => ({ date: formatDate(i.date), amount: i.amount }))} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" stroke="#888888" />
                <YAxis stroke="#888888" />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#22c55e"
                  fillOpacity={1}
                  fill="url(#colorIncome)"
                  dot={{ r: 5 }}
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
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
              {income.length === 0 ? (
                <div className="text-gray-500 text-center">No income data yet.</div>
              ) : (
                income.map((transaction, index) => (
                  <div
                    key={transaction._id || index}
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
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Add Income Modal */}
      {showAddModal && (
        <AddTransactionModal
          type="income"
          onClose={() => setShowAddModal(false)}
          onSubmit={async (data) => {
            try {
              await authService.addIncome(data);
              setShowAddModal(false);
              setLoading(true);
              const incomeData = await authService.getIncome();
              setIncome(incomeData);
            } catch (e) {
              setShowAddModal(false);
            } finally {
              setLoading(false);
            }
          }}
        />
      )}
    </div>
  );
};

export default IncomePage;