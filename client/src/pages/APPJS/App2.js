// THIS IS THE ONE SHOWING THE STEP BY STEP 
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Analytics from './pages/Analytics';
import BlogFeed from './pages/BlogFeed';
import LandingPage from './pages/LandingPage';

const App = () => {
  // Authentication state to track user login status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle successful login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        {/* Landing Page is accessible to everyone */}
        <Route path="/" element={<LandingPage />} />

        {/* Login Page - Pass handleLogin to update authentication state */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Signup Page */}
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes - Redirect to Login if not authenticated */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <Dashboard />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/analytics"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <Analytics />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/blogfeed"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <BlogFeed />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
