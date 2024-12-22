import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IncomeStream.css';  // Import the CSS file
import NavBar from '../components/Navbar';  // Import NavBar component

const IncomeStream = () => {
  // Get the userId from localStorage
  const [userId, setUserId] = useState(null);
  
  // State for form data
  const [incomeData, setIncomeData] = useState({
    dateReceived: '',
    source: '',
    description: '',
    account: 'Other',
    amount: '',
    category: 'Other',
    isRecurring: false,
  });

  // State for the income streams
  const [incomeStreams, setIncomeStreams] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  // Retrieve userId from localStorage when the component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserId(user.id);  // Set userId from localStorage
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncomeData({ ...incomeData, [name]: value });
  };

  // Submit the new income stream form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Please log in to add an income.");
      return;
    }

    // Ensure dateReceived is not empty and amount is a number
    const validIncomeData = {
      ...incomeData,
      dateReceived: incomeData.dateReceived || new Date(),
      amount: parseFloat(incomeData.amount), 
      userId
    };

    try {
      const response = await axios.post(`http://localhost:5000/api/income`, validIncomeData);
      console.log(response.data);
      
      // Reset the form fields
      setIncomeData({
        dateReceived: '',
        source: '',
        description: '',
        account: 'Other',
        amount: '',
        category: 'Other',
        isRecurring: false,
      });

      // Fetch updated income streams
      fetchIncomeStreams();
    } catch (error) {
      console.error('Error adding income stream:', error);
    }
  };

  // Handle checkbox change
  const handleRecurringChange = (e) => {
    setIncomeData({ ...incomeData, isRecurring: e.target.checked });
  };

  // Fetch all income streams for a user
  const fetchIncomeStreams = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/income/${userId}`);
      setIncomeStreams(response.data);
    } catch (error) {
      console.error('Error fetching income streams:', error);
    }
  };

  // Fetch total income for a user
  const fetchTotalIncome = async () => {
    try {
      if (!userId) {
        console.error("User ID is missing");
        return;
      }
      const response = await axios.get(`http://localhost:5000/api/income/total/${userId}`);
      setTotalIncome(response.data.total);
    } catch (error) {
      console.error('Error fetching total income:', error);
    }
  };

  // Effect to fetch income streams and total income on component mount
  useEffect(() => {
    if (userId) {
      fetchIncomeStreams();
      fetchTotalIncome();
    }
  }, [userId]);

  // Delete income stream
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/income/${id}`);
      fetchIncomeStreams();
    } catch (error) {
      console.error('Error deleting income stream:', error);
    }
  };

  return (
    <div className="income-stream-container">
      <NavBar /> {/* Use the imported NavBar component */}

      <h1>Income Streams</h1>
      
      {/* Form to create income stream */}
      <form onSubmit={handleSubmit} className="income-form">
        <label>
          Date:
          <input
            type="date"
            name="dateReceived"
            value={incomeData.dateReceived}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Income Source:
          <input
            type="text"
            name="source"
            value={incomeData.source}
            onChange={handleChange}
            placeholder="e.g. Salary, Business"
            required
          />
        </label>

        <label>
          Description:
          <input
            type="text"
            name="description"
            value={incomeData.description}
            onChange={handleChange}
            placeholder="Provide a brief description of the income"
          />
        </label>

        <label>
          Account Type:
          <select name="account" value={incomeData.account} onChange={handleChange}>
            <option value="Bank">Bank</option>
            <option value="Cash">Cash</option>
            <option value="Digital Wallet">Digital Wallet</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={incomeData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            required
          />
        </label>

        <label>
          Category:
          <select name="category" value={incomeData.category} onChange={handleChange}>
            <option value="Salary">Salary</option>
            <option value="Business">Business</option>
            <option value="Gift">Gift</option>
            <option value="Investment">Investment</option>
            <option value="Bonus">Bonus</option>
            <option value="Other">Other</option>
            <option value="commissions">Commissions</option>
          </select>
        </label>

        <label>
          Recurring Income:
          <input
            type="checkbox"
            name="isRecurring"
            checked={incomeData.isRecurring}
            onChange={handleRecurringChange}
          />
        </label>

        <button type="submit" className="submit-btn">Add Income</button>
      </form>

      {/* Display total income */}
      <h2>Total Income: ${totalIncome}</h2>

      {/* List of income streams */}
      <h3>Income Streams</h3>
      <ul className="income-list">
        {incomeStreams.map((income) => (
          <li key={income._id} className="income-item">
            <p>{income.source} - ${income.amount}</p>
            <button onClick={() => handleDelete(income._id)} className="delete-btn">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomeStream;