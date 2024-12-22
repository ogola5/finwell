import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/Navbar'; // Import the NavBar component
import './BudgetManager.css'; // Import the CSS file
import Analytics from '../pages/Analytics'

const BudgetManager = () => {
  const [userId, setUserId] = useState(null);
  const [budgets, setBudgets] = useState([]);
  const [budgetData, setBudgetData] = useState({
    totalMonthlyLimit: '',
    categoryLimits: [{ category: 'Food', limit: '' }],
    notifyWhenApproaching: true,
    notificationThreshold: 90,
  });

  // Fetching user ID from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserId(user.id);
    }
  }, []);

  // Fetching budget data when the user is set
  useEffect(() => {
    if (userId) {
      fetchBudgets();
    }
  }, [userId]);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/budget/${userId}`);
      setBudgets(response.data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    }
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'category' || name === 'limit') {
      const updatedLimits = [...budgetData.categoryLimits];
      updatedLimits[index][name] = name === 'limit' ? Number(value) : value;
      setBudgetData({ ...budgetData, categoryLimits: updatedLimits });
    } else {
      setBudgetData({ ...budgetData, [name]: value });
    }
  };

  const handleAddCategory = () => {
    setBudgetData({
      ...budgetData,
      categoryLimits: [...budgetData.categoryLimits, { category: '', limit: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/budget', { ...budgetData, userId });
      fetchBudgets();
      setBudgetData({
        totalMonthlyLimit: '',
        categoryLimits: [{ category: 'Food', limit: '' }],
        notifyWhenApproaching: true,
        notificationThreshold: 90,
      });
    } catch (error) {
      console.error('Error creating budget:', error);
    }
  };

  return (
    <div>
      {/* Place NavBar outside the main content to keep links functional */}
      <NavBar /> 

      <div className="budget-manager-container">
        <h1 className="budget-manager-header">Budget Manager</h1>

        {/* Column Layout for Budget and Analytics */}
        <div className="budget-manager-content">
          {/* Budget Section */}
          <div className="budget-manager-section">
            <form className="budget-manager-form" onSubmit={handleSubmit}>
              <input
                type="number"
                name="totalMonthlyLimit"
                value={budgetData.totalMonthlyLimit}
                onChange={(e) => handleChange(e)}
                placeholder="Total Monthly Limit"
                required
                className="budget-manager-input"
              />

              <h3>Category Limits</h3>
              {budgetData.categoryLimits.map((category, index) => (
                <div key={index} className="budget-manager-category-container">
                  <select
                    name="category"
                    value={category.category}
                    onChange={(e) => handleChange(e, index)}
                    className="budget-manager-select"
                  >
                    <option value="Food">Food</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Fuel">Fuel</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Rent">Rent</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    type="number"
                    name="limit"
                    value={category.limit}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Limit"
                    required
                    className="budget-manager-input"
                  />
                </div>
              ))}
              <button type="button" onClick={handleAddCategory} className="budget-manager-button-secondary">
                Add Category
              </button>

              <div className="budget-manager-checkbox-container">
                <label>
                  Notify When Approaching:
                  <input
                    type="checkbox"
                    name="notifyWhenApproaching"
                    checked={budgetData.notifyWhenApproaching}
                    onChange={(e) =>
                      setBudgetData({ ...budgetData, notifyWhenApproaching: e.target.checked })
                    }
                  />
                </label>
                {budgetData.notifyWhenApproaching && (
                  <input
                    type="number"
                    name="notificationThreshold"
                    value={budgetData.notificationThreshold}
                    onChange={(e) => handleChange(e)}
                    className="budget-manager-input"
                    placeholder="Notification Threshold (%)"
                  />
                )}
              </div>

              <button type="submit" className="budget-manager-button">
                Save Budget
              </button>
            </form>

            {/* Budget List */}
            <h3>Existing Budgets</h3>
            <ul className="budget-manager-budgets-list">
              {budgets.map((budget, index) => (
                <li key={index} className="budget-manager-budget-item">
                  <h4>${budget.totalMonthlyLimit}</h4>
                  <ul className="budget-manager-category-list">
                    {budget.categoryLimits.map((cat, i) => (
                      <li key={i} className="budget-manager-category-item">
                        {cat.category}: ${cat.limit}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          {/* Analytics Section */}
          <div className="budget-manager-section">
            <div className="analytics-container">
              <h2 className="analytics-title">My Analytics</h2>
              <h4 className="analytics-sub">A look into how you spent. You can consider it for your planning</h4>
              
              <Analytics /> {/* Import and render the Analytics component */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetManager;