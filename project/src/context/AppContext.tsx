import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Transaction, User, DashboardStats } from '../types';
import { mockTransactions, mockDashboardStats } from '../data/mockData';

interface AppContextType {
  user: User | null;
  transactions: Transaction[];
  dashboardStats: DashboardStats;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  showToast: (message: string, type: 'success' | 'error') => void;
  toast: { message: string; type: 'success' | 'error' } | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>(mockDashboardStats);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const isAuthenticated = user !== null;

  const login = (email: string, password: string) => {
    // Mock login - in real app, this would make API call
    setUser({
      id: '1',
      name: 'John Doe',
      email: email
    });
  };

  const signup = (name: string, email: string, password: string) => {
    // Mock signup - in real app, this would make API call
    setUser({
      id: '1',
      name: name,
      email: email
    });
  };

  const logout = () => {
    setUser(null);
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString()
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Update dashboard stats
    const amount = transaction.amount;
    if (transaction.type === 'income') {
      setDashboardStats(prev => ({
        ...prev,
        totalIncome: prev.totalIncome + amount,
        totalBalance: prev.totalBalance + amount
      }));
    } else {
      setDashboardStats(prev => ({
        ...prev,
        totalExpense: prev.totalExpense + amount,
        totalBalance: prev.totalBalance - amount
      }));
    }
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <AppContext.Provider value={{
      user,
      transactions,
      dashboardStats,
      isAuthenticated,
      login,
      signup,
      logout,
      addTransaction,
      showToast,
      toast
    }}>
      {children}
    </AppContext.Provider>
  );
};