// THIS IS THE CODE SHOWING THE DASH
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import AddExpense from './pages/AddExpense';
import Analytics from './pages/Analytics';
import BlogFeed from './pages/BlogFeed';
// import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/add-expense" element={<AddExpense />} /> */}
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/blogfeed" element={<BlogFeed />} /> 
        {/* <LandingPage /> */}
      </Routes>
    </Router>
  );
};

export default App;