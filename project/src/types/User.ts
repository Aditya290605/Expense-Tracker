export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface FinancialData {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
  transactions: Transaction[];
  monthlyData: { month: string; income: number; expense: number }[];
  dailyExpenses: { day: string; amount: number }[];
}

export const mockUser: User = {
  id: '1',
  name: 'Aditya Magar',
  email: 'john@example.com'
};

export const mockFinancialData: FinancialData = {
  totalBalance: 45750,
  totalIncome: 85000,
  totalExpense: 39250,
  transactions: [
    { id: '1', type: 'income', amount: 50000, category: 'Salary', description: 'Monthly salary', date: '2024-01-01' },
    { id: '2', type: 'expense', amount: 5000, category: 'Groceries', description: 'Weekly groceries', date: '2024-01-02' },
    { id: '3', type: 'income', amount: 15000, category: 'Freelance', description: 'Web development project', date: '2024-01-03' },
    { id: '4', type: 'expense', amount: 12000, category: 'Rent', description: 'Monthly rent', date: '2024-01-04' },
    { id: '5', type: 'expense', amount: 3000, category: 'Transportation', description: 'Uber rides', date: '2024-01-05' },
    { id: '6', type: 'income', amount: 20000, category: 'Investment', description: 'Stock dividend', date: '2024-01-06' },
    { id: '7', type: 'expense', amount: 8000, category: 'Entertainment', description: 'Movies and dining', date: '2024-01-07' },
    { id: '8', type: 'expense', amount: 4500, category: 'Utilities', description: 'Electricity bill', date: '2024-01-08' },
    { id: '9', type: 'expense', amount: 6750, category: 'Shopping', description: 'Clothing and accessories', date: '2024-01-09' }
  ],
  monthlyData: [
    { month: 'Jan', income: 85000, expense: 39250 },
    { month: 'Feb', income: 72000, expense: 45000 },
    { month: 'Mar', income: 91000, expense: 38000 },
    { month: 'Apr', income: 68000, expense: 42000 },
    { month: 'May', income: 78000, expense: 40000 },
    { month: 'Jun', income: 85000, expense: 44000 }
  ],
  dailyExpenses: [
    { day: 'Mon', amount: 2500 },
    { day: 'Tue', amount: 4200 },
    { day: 'Wed', amount: 3800 },
    { day: 'Thu', amount: 5100 },
    { day: 'Fri', amount: 6300 },
    { day: 'Sat', amount: 4700 },
    { day: 'Sun', amount: 3200 }
  ]
};