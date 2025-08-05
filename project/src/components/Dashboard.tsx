import React, { useState } from 'react';
import Navbar from './Navbar';
import SlidingPanel from './SlidingPanel';
import FinancialSummary from './FinancialSummary';
import PieChart from './PieChart';
import ExpenseChart from './ExpenseChart';
import RecentTransactions from './RecentTransactions';
import AddTransactionModal from './AddTransactionModal';
import { User, mockFinancialData } from '../types/User';
import { AppPage } from '../App';

interface DashboardProps {
  user: User | null;
  onNavigate: (page: AppPage) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate, onLogout }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState<'income' | 'expense'>('expense');

  const handleAddTransaction = (type: 'income' | 'expense') => {
    setModalType(type);
    setShowAddModal(true);
  };

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
        currentPage="dashboard"
      />

      <div className="pt-16 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-gray-600">Here's your financial overview for today</p>
          </div>

          {/* Financial Summary Cards */}
          <FinancialSummary 
            data={mockFinancialData} 
            onAddTransaction={handleAddTransaction}
          />

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <PieChart data={mockFinancialData} />
            <ExpenseChart data={mockFinancialData.dailyExpenses} />
          </div>

          {/* Recent Transactions */}
          <RecentTransactions transactions={mockFinancialData.transactions} />
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <AddTransactionModal
          type={modalType}
          onClose={() => setShowAddModal(false)}
          onSubmit={(data) => {
            console.log('Transaction data:', data);
            setShowAddModal(false);
            // In real app, this would update the data
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;