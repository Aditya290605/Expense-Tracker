import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import IncomePage from './components/IncomePage';
import ExpensePage from './components/ExpensePage';
import ReportsPage from './components/ReportsPage';
import FilterPage from './components/FilterPage';
import AIReportPage from './components/AIReportPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';
import LoadingSpinner from './components/LoadingSpinner';

export type AppPage = 'landing' | 'auth' | 'dashboard' | 'income' | 'expense' | 'reports' | 'filter' | 'ai-report';

function AppContent() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<AppPage>('landing');

  const handleLogout = () => {
    logout();
    setCurrentPage('landing');
  };

  // Redirect based on authentication status
  useEffect(() => {
    if (loading) return; // Don't redirect while loading

    if (isAuthenticated && user) {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('landing');
    }
  }, [isAuthenticated, user, loading]);

  // Show loading screen while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" text="Loading..." />
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={() => setCurrentPage('auth')} />;
      case 'auth':
        return <AuthPage onBack={() => setCurrentPage('landing')} />;
      case 'dashboard':
        return <Dashboard user={user} onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'income':
        return <IncomePage user={user} onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'expense':
        return <ExpensePage user={user} onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'reports':
        return <ReportsPage user={user} onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'filter':
        return <FilterPage user={user} onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'ai-report':
        return <AIReportPage user={user} onNavigate={setCurrentPage} onLogout={handleLogout} />;
      default:
        return <LandingPage onGetStarted={() => setCurrentPage('auth')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;