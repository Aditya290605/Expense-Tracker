import React, { useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Toast: React.FC = () => {
  const { toast, showToast } = useApp();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        showToast('', 'success'); // Clear toast
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (!toast) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 ${
      toast.type === 'success' 
        ? 'bg-green-500 text-white' 
        : 'bg-red-500 text-white'
    }`}>
      <div className="flex items-center gap-3">
        {toast.type === 'success' ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <XCircle className="w-5 h-5" />
        )}
        <span className="font-medium">{toast.message}</span>
        <button
          onClick={() => showToast('', 'success')}
          className="ml-2 hover:opacity-80"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;