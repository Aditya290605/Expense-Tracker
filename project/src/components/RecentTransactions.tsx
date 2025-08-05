import React from 'react';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { Transaction } from '../types/User';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
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
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {transactions.slice(0, 6).map((transaction, index) => (
          <div
            key={transaction.id}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`p-2 rounded-lg ${
              transaction.type === 'income' 
                ? 'bg-green-100' 
                : 'bg-red-100'
            }`}>
              {transaction.type === 'income' ? (
                <TrendingUp className="w-5 h-5 text-green-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-600" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{transaction.category}</p>
                  <p className="text-sm text-gray-500">{transaction.description}</p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
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
  );
};

export default RecentTransactions;