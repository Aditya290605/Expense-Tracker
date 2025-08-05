import { Transaction, DashboardStats } from '../types';

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 45000,
    category: 'Salary',
    description: 'Monthly salary',
    date: '2024-01-15',
    icon: 'Briefcase'
  },
  {
    id: '2',
    type: 'expense',
    amount: 2500,
    category: 'Groceries',
    description: 'Weekly grocery shopping',
    date: '2024-01-14',
    icon: 'ShoppingCart'
  },
  {
    id: '3',
    type: 'expense',
    amount: 8000,
    category: 'Rent',
    description: 'Monthly rent payment',
    date: '2024-01-13',
    icon: 'Home'
  },
  {
    id: '4',
    type: 'income',
    amount: 5000,
    category: 'Freelance',
    description: 'Web development project',
    date: '2024-01-12',
    icon: 'Code'
  },
  {
    id: '5',
    type: 'expense',
    amount: 1200,
    category: 'Transportation',
    description: 'Fuel and maintenance',
    date: '2024-01-11',
    icon: 'Car'
  },
  {
    id: '6',
    type: 'expense',
    amount: 3000,
    category: 'Entertainment',
    description: 'Movies and dining',
    date: '2024-01-10',
    icon: 'Film'
  },
  {
    id: '7',
    type: 'income',
    amount: 2000,
    category: 'Investment',
    description: 'Dividend income',
    date: '2024-01-09',
    icon: 'TrendingUp'
  },
  {
    id: '8',
    type: 'expense',
    amount: 1500,
    category: 'Healthcare',
    description: 'Medical checkup',
    date: '2024-01-08',
    icon: 'Heart'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalBalance: 36800,
  totalIncome: 52000,
  totalExpense: 15200,
  incomeChange: 12.5,
  expenseChange: -8.3
};

export const mockDailyExpenses = [
  { day: 'Mon', amount: 2500 },
  { day: 'Tue', amount: 1800 },
  { day: 'Wed', amount: 3200 },
  { day: 'Thu', amount: 1500 },
  { day: 'Fri', amount: 4100 },
  { day: 'Sat', amount: 2800 },
  { day: 'Sun', amount: 1900 }
];

export const incomeCategories = [
  { value: 'salary', label: 'Salary', icon: 'Briefcase' },
  { value: 'freelance', label: 'Freelance', icon: 'Code' },
  { value: 'investment', label: 'Investment', icon: 'TrendingUp' },
  { value: 'business', label: 'Business', icon: 'Building' },
  { value: 'gift', label: 'Gift', icon: 'Gift' },
  { value: 'other', label: 'Other', icon: 'Plus' }
];

export const expenseCategories = [
  { value: 'groceries', label: 'Groceries', icon: 'ShoppingCart' },
  { value: 'rent', label: 'Rent', icon: 'Home' },
  { value: 'transportation', label: 'Transportation', icon: 'Car' },
  { value: 'entertainment', label: 'Entertainment', icon: 'Film' },
  { value: 'healthcare', label: 'Healthcare', icon: 'Heart' },
  { value: 'utilities', label: 'Utilities', icon: 'Zap' },
  { value: 'food', label: 'Food & Dining', icon: 'Coffee' },
  { value: 'shopping', label: 'Shopping', icon: 'ShoppingBag' },
  { value: 'education', label: 'Education', icon: 'BookOpen' },
  { value: 'other', label: 'Other', icon: 'More' }
];