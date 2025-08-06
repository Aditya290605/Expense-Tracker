import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  type: ToastType;
  message: string;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ 
  type, 
  message, 
  duration = 5000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyles = () => {
    const baseStyles = 'fixed top-4 right-4 z-50 max-w-sm w-full bg-white rounded-lg shadow-lg border-l-4 p-4 transform transition-all duration-300';
    
    const typeStyles = {
      success: 'border-green-500',
      error: 'border-red-500',
      warning: 'border-yellow-500',
      info: 'border-blue-500'
    };

    return `${baseStyles} ${typeStyles[type]} ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`;
  };

  const getIcon = () => {
    const iconClasses = 'w-5 h-5';
    
    switch (type) {
      case 'success':
        return <CheckCircle className={`${iconClasses} text-green-500`} />;
      case 'error':
        return <XCircle className={`${iconClasses} text-red-500`} />;
      case 'warning':
        return <AlertCircle className={`${iconClasses} text-yellow-500`} />;
      case 'info':
        return <AlertCircle className={`${iconClasses} text-blue-500`} />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'success':
        return 'Success';
      case 'error':
        return 'Error';
      case 'warning':
        return 'Warning';
      case 'info':
        return 'Info';
      default:
        return '';
    }
  };

  return (
    <div className={getToastStyles()}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">{getTitle()}</p>
          <p className="mt-1 text-sm text-gray-500">{message}</p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
