import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  TrendingDown, 
  Filter, 
  FileText,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
      color: 'text-blue-600'
    },
    {
      path: '/income',
      icon: TrendingUp,
      label: 'Income',
      color: 'text-green-600'
    },
    {
      path: '/expense',
      icon: TrendingDown,
      label: 'Expense',
      color: 'text-red-600'
    },
    {
      path: '/filter',
      icon: Filter,
      label: 'Filter',
      color: 'text-purple-600'
    },
    {
      path: '/report',
      icon: FileText,
      label: 'Report',
      color: 'text-orange-600'
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white/95 backdrop-blur-md border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:z-auto`}>
        
        {/* Mobile Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-gradient-to-r from-teal-50 to-purple-50 border border-teal-200 shadow-sm' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? item.color : 'text-gray-500 group-hover:text-gray-700'}`} />
                <span className={`font-medium ${
                  isActive ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-teal-500 rounded-full"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-teal-500 to-purple-600 rounded-xl p-4 text-white">
            <h3 className="font-semibold mb-1">Pro Tip</h3>
            <p className="text-sm opacity-90">
              Track your expenses daily for better financial insights
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;