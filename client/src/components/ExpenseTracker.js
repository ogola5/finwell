import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa';
import { FaDollarSign } from 'react-icons/fa'; // Font Awesome Dollar Sign
import Navbar from '../components/Navbar'; 

import './ExpenseTracker.css'; // Updated CSS for styling

const ExpenseTracker = () => {
  const [userId, setUserId] = useState(null);
  const [expenseData, setExpenseData] = useState({
    date: '',
    description: '',
    account: 'Cash',
    category: 'Other',
    subCategory: '',
    paymentMethod: 'Cash',
    amount: '',
    isRecurring: false,
    notes: '',
  });

  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserId(user.id);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "amount") {
      setExpenseData({
        ...expenseData,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setExpenseData({
        ...expenseData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const fetchExpenses = async () => {
    try {
      if (userId) {
        const response = await axios.get(`http://localhost:5000/api/expenses/user/${userId}`);
        setExpenses(response.data);
        calculateTotalExpenses(response.data);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const calculateTotalExpenses = (expenses) => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalExpenses(total);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Please log in to add an expense.");
      return;
    }

    try {
      const newExpenseData = { ...expenseData, userId };
      const response = await axios.post('http://localhost:5000/api/expenses', newExpenseData);
      alert('Expense added successfully!');
      setExpenseData({
        date: '',
        description: '',
        account: 'Cash',
        category: 'Other',
        subCategory: '',
        paymentMethod: 'Cash',
        amount: '',
        isRecurring: false,
        notes: '',
      });
      fetchExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      alert('Expense deleted successfully!');
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense. Please try again.');
    }
  };

  useEffect(() => {
    if (userId) {
      fetchExpenses();
    }
  }, [userId]);

  return (
    <div className="expense-tracker">
       <Navbar />
      <h1 className="expense-tracker-title">Expense Tracker</h1>

      <form className="expense-tracker-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date</label>
          <input type="date" name="date" value={expenseData.date} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input type="text" name="description" value={expenseData.description} onChange={handleChange} placeholder="Description" required />
        </div>
        <div className="form-group">
          <label>Account</label>
          <select name="account" value={expenseData.account} onChange={handleChange}>
            <option value="Cash">Cash</option>
            <option value="Bank">Bank</option>
            <option value="Digital Wallet">Digital Wallet</option>
          </select>
        </div>
        <div className="form-group">
          <label>Category</label>
          <select name="category" value={expenseData.category} onChange={handleChange}>
            <option value="Food">Food</option>
            <option value="Clothing">Clothing</option>
            <option value="Fuel">Fuel</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Sub-Category</label>
          <input type="text" name="subCategory" value={expenseData.subCategory} onChange={handleChange} placeholder="Sub-Category (optional)" />
        </div>
        <div className="form-group">
          <label>Payment Method</label>
          <select name="paymentMethod" value={expenseData.paymentMethod} onChange={handleChange}>
            <option value="Cash">Cash</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Mobile Payment">Mobile Payment</option>
          </select>
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input type="number" name="amount" value={expenseData.amount} onChange={handleChange} placeholder="Amount" required />
        </div>
        <div className="form-group">
          <label>
            Recurring
            <input type="checkbox" name="isRecurring" checked={expenseData.isRecurring} onChange={handleChange} />
          </label>
        </div>
        <div className="form-group">
          <label>Notes</label>
          <textarea name="notes" value={expenseData.notes} onChange={handleChange} placeholder="Notes (optional)" />
        </div>
        <button type="submit" className="btn-add-expense">
          <FaPlusCircle /> Add Expense
        </button>
      </form>

      <div className="total-expenses">
        <h2>Total Expenses: ${totalExpenses.toFixed(2)}</h2>
      </div>

      <h3>Expense List</h3>
      <ul className="expense-list">
        {expenses.map((expense) => (
          <li key={expense._id} className="expense-item">
            <div>
              <p>
                <strong>{expense.date}</strong> - {expense.description} - ${expense.amount} ({expense.category})
              </p>
              <button className="btn-delete" onClick={() => handleDelete(expense._id)}>
                <FaTrashAlt /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;