import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Income from './pages/Income';
import Expense from './pages/Expense';
import Filter from './pages/Filter';
import Report from './pages/Report';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar onMenuClick={toggleSidebar} />
          
          <div className="flex">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <div className="flex w-full">
                      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
                      <div className="flex-1 lg:ml-64">
                        <Dashboard />
                      </div>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/income" 
                element={
                  <ProtectedRoute>
                    <div className="flex w-full">
                      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
                      <div className="flex-1 lg:ml-64">
                        <Income />
                      </div>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/expense" 
                element={
                  <ProtectedRoute>
                    <div className="flex w-full">
                      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
                      <div className="flex-1 lg:ml-64">
                        <Expense />
                      </div>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/filter" 
                element={
                  <ProtectedRoute>
                    <div className="flex w-full">
                      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
                      <div className="flex-1 lg:ml-64">
                        <Filter />
                      </div>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/report" 
                element={
                  <ProtectedRoute>
                    <div className="flex w-full">
                      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
                      <div className="flex-1 lg:ml-64">
                        <Report />
                      </div>
                    </div>
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
          
          <Toast />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;