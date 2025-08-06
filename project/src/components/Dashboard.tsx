import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import SlidingPanel from './SlidingPanel';
import FinancialSummary from './FinancialSummary';
import PieChart from './PieChart';
import ExpenseChart from './ExpenseChart';
import RecentTransactions from './RecentTransactions';
import AddTransactionModal from './AddTransactionModal';
import { User } from '../types/User';
import { AppPage } from '../App';
import { authService } from '../services/authService';
import LoadingSpinner from './LoadingSpinner';

interface DashboardProps {
  user: User | null;
  onNavigate: (page: AppPage) => void;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate, onLogout }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState<'income' | 'expense'>('expense');
  const [loading, setLoading] = useState(true);
  const [income, setIncome] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [incomeData, expenseData] = await Promise.all([
          authService.getIncome(),
          authService.getExpenses()
        ]);
        setIncome(incomeData);
        setExpenses(expenseData);
      } catch (e) {
        setIncome([]);
        setExpenses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddTransaction = (type: 'income' | 'expense') => {
    setModalType(type);
    setShowAddModal(true);
  };

  // Calculate totals
  const totalIncome = income.reduce((sum, t) => sum + (t.amount || 0), 0);
  const totalExpense = expenses.reduce((sum, t) => sum + (t.amount || 0), 0);
  const totalBalance = totalIncome - totalExpense;

  // Prepare transactions for RecentTransactions
  const transactions = [
    ...income.map((t) => ({ ...t, type: 'income' })),
    ...expenses.map((t) => ({ ...t, type: 'expense' }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Prepare data for PieChart and ExpenseChart
  // Aggregate daily expenses
  const dailyExpenseMap: Record<string, number> = {};
  expenses.forEach((exp) => {
    const day = new Date(exp.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    dailyExpenseMap[day] = (dailyExpenseMap[day] || 0) + (exp.amount || 0);
  });
  const dailyExpenses = Object.entries(dailyExpenseMap).map(([day, amount]) => ({ day, amount }));
  // Sort by date (convert back to Date for sorting)
  dailyExpenses.sort((a, b) => {
    const parse = (d: string) => new Date(`${d} ${new Date().getFullYear()}`);
    return parse(a.day).getTime() - parse(b.day).getTime();
  });

  const financialData = {
    totalBalance,
    totalIncome,
    totalExpense,
    transactions,
    monthlyData: [],
    dailyExpenses,
  };

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
            data={financialData} 
            onAddTransaction={handleAddTransaction}
          />
          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <PieChart data={financialData} />
            <ExpenseChart data={financialData.dailyExpenses} />
          </div>
          {/* Recent Transactions */}
          <RecentTransactions transactions={financialData.transactions} />
        </div>
      </div>
      {/* Add Transaction Modal */}
      {showAddModal && (
        <AddTransactionModal
          type={modalType}
          onClose={() => setShowAddModal(false)}
          onSubmit={async (data) => {
            try {
              if (modalType === 'income') {
                await authService.addIncome(data);
              } else {
                await authService.addExpense(data);
              }
              setShowAddModal(false);
              // Refresh data
              setLoading(true);
              const [incomeData, expenseData] = await Promise.all([
                authService.getIncome(),
                authService.getExpenses()
              ]);
              setIncome(incomeData);
              setExpenses(expenseData);
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

export default Dashboard;