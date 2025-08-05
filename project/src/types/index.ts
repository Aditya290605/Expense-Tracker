export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  icon: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface DashboardStats {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  incomeChange: number;
  expenseChange: number;
}