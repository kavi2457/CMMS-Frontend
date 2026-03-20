import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import DailyMenu from './pages/DailyMenu';
import ExtrasPage from './pages/ExtrasPage';
import FirstPage from './pages/FirstPage';
import DailyMenu from './pages/DailyMenu';
import ComplaintPage from "./pages/ComplaintPage";
import ProtectedRoute from './components/auth/ProtectedRoute';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        
        {/* Protected Routes */}
        <Route path="/first" element={
          <ProtectedRoute>
            <FirstPage />
          </ProtectedRoute>
        } />
        <Route path="/menu" element={
          <ProtectedRoute>
            <DailyMenu />
          </ProtectedRoute>
        } />
        <Route path="/feedbacks" element={
          <ProtectedRoute>
            <ComplaintPage />
          </ProtectedRoute>
        } />

        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* This is the CMMS Login/Landing page your teammate built */}
        <Route path="/home" element={<HomePage />} />

        {/* Daily Mess Menu Page */}
        <Route path="/menu" element={<DailyMenu />} />
        
        {/* Your Completed Extras Page */}
        <Route path="/extras" element={<ExtrasPage />} />

        <Route path="/billing" element={<BillingPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;

