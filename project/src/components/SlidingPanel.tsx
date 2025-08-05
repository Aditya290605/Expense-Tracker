import React from 'react';
import { X, LayoutDashboard, TrendingUp, TrendingDown, Filter, Brain, BarChart3 } from 'lucide-react';
import { AppPage } from '../App';

interface SlidingPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: AppPage) => void;
  currentPage: AppPage;
}

const SlidingPanel: React.FC<SlidingPanelProps> = ({ isOpen, onClose, onNavigate, currentPage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'from-blue-500 to-blue-600' },
    { id: 'income', label: 'Income', icon: TrendingUp, color: 'from-green-500 to-green-600' },
    { id: 'expense', label: 'Expenses', icon: TrendingDown, color: 'from-red-500 to-red-600' },
    { id: 'reports', label: 'Reports', icon: BarChart3, color: 'from-purple-500 to-purple-600' },
    { id: 'filter', label: 'Filter', icon: Filter, color: 'from-orange-500 to-orange-600' },
    { id: 'ai-report', label: 'AI Report', icon: Brain, color: 'from-teal-500 to-teal-600' },
  ];

  const handleItemClick = (page: AppPage) => {
    onNavigate(page);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sliding Panel */}
      <div className={`fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Navigation</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="p-6 space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id as AppPage)}
                className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg transform scale-105'
                    : 'hover:bg-gray-50 text-gray-700 hover:scale-105'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  isActive 
                    ? 'bg-white/20' 
                    : 'bg-gradient-to-r ' + item.color
                }`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white'}`} />
                </div>
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <p className="text-sm text-gray-600 mb-2">Need help?</p>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SlidingPanel;