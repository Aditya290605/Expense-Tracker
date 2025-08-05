import React from 'react';

interface ExpenseChartProps {
  data: { day: string; amount: number }[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ data }) => {
  const maxAmount = Math.max(...data.map(d => d.amount));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Daily Expenses</h3>
      
      <div className="space-y-4">
        {data.map((item, index) => {
          const percentage = (item.amount / maxAmount) * 100;
          
          return (
            <div key={item.day} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-gray-600">{item.day}</div>
              <div className="flex-1 relative">
                <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                    style={{ 
                      width: `${percentage}%`,
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    <span className="text-white text-xs font-medium">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Week Total</span>
          <span className="text-lg font-bold text-gray-900">
            {formatCurrency(data.reduce((sum, item) => sum + item.amount, 0))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;