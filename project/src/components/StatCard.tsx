import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  amount: number;
  change?: number;
  icon: LucideIcon;
  type: 'balance' | 'income' | 'expense';
}

const StatCard: React.FC<StatCardProps> = ({ title, amount, change, icon: Icon, type }) => {
  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getCardStyles = () => {
    switch (type) {
      case 'balance':
        return 'bg-gradient-to-br from-blue-500 to-purple-600 text-white';
      case 'income':
        return 'bg-gradient-to-br from-green-500 to-emerald-600 text-white';
      case 'expense':
        return 'bg-gradient-to-br from-red-500 to-pink-600 text-white';
      default:
        return 'bg-white border border-gray-200';
    }
  };

  return (
    <div className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${getCardStyles()}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="font-medium text-sm opacity-90">{title}</h3>
        </div>
        {change !== undefined && (
          <div className={`text-xs font-medium px-2 py-1 rounded-full ${
            change >= 0 
              ? 'bg-green-500/20 text-green-100' 
              : 'bg-red-500/20 text-red-100'
          }`}>
            {change >= 0 ? '+' : ''}{change.toFixed(1)}%
          </div>
        )}
      </div>
      
      <div className="text-2xl font-bold mb-1">
        {formatAmount(amount)}
      </div>
      
      <div className="text-xs opacity-75">
        {type === 'balance' && 'Available Balance'}
        {type === 'income' && 'This Month'}
        {type === 'expense' && 'This Month'}
      </div>
    </div>
  );
};

export default StatCard;