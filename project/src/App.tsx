import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import IncomePage from './components/IncomePage';
import ExpensePage from './components/ExpensePage';
import ReportsPage from './components/ReportsPage';
import FilterPage from './components/FilterPage';
import AIReportPage from './components/AIReportPage';
import { User, mockUser } from './types/User';

export type AppPage = 'landing' | 'auth' | 'dashboard' | 'income' | 'expense' | 'reports' | 'filter' | 'ai-report';

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('landing');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('landing');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={() => setCurrentPage('auth')} />;
      case 'auth':
        return <AuthPage onLogin={handleLogin} onBack={() => setCurrentPage('landing')} />;
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

export default App;