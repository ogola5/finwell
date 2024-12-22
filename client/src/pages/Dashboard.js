import React, { useState, useEffect } from 'react';
import { FaWallet, FaArrowUp, FaArrowDown, FaChartLine, FaPlusCircle, FaMoneyBillWave, FaHandsHelping, FaChartBar } from 'react-icons/fa';
import './Dashboard.css';
import QuoteButton from './QuoteButton';
import InvestmentAreas from './Investment';
import { Link } from 'react-router-dom';
import Chatbot from './Chatbot'; // Adjust the path based on your file structure

const Dashboard = () => {
  // State for holding all transactions (both income and expense)
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Retrieve userId from localStorage when the component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserId(user.id);  // Set userId from localStorage
    }
  }, []);
  
  // Fetch income and expenses data from API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let incomeData = [];
        let expenseData = [];

        if (userId) {
          // Fetch income transactions
          const incomeResponse = await fetch(`http://localhost:5000/api/income/${userId}`);
          incomeData = await incomeResponse.json();
          console.log('Fetched Income:', incomeData);  // Log the fetched income data

          // Fetch expense transactions
          const expenseResponse = await fetch(`http://localhost:5000/api/expenses/user/${userId}`);
          expenseData = await expenseResponse.json();
          console.log('Fetched Expenses:', expenseData);  // Log the fetched expense data
        }

        // Combine both income and expense data
        const combinedTransactions = [
          ...incomeData.map(item => ({
            ...item,
            type: 'Income',
            amount: item.amount,
            date: new Date(item.dateReceived),
            description: item.description,
          })),
          ...expenseData.map(item => ({
            ...item,
            type: 'Expense',
            amount: item.amount,
            date: new Date(item.date),
            description: item.description,
          }))
        ];

        // Sort combined transactions by date (latest first)
        const sortedTransactions = combinedTransactions.sort((a, b) => b.date - a.date);

        // Set transactions state
        setTransactions(sortedTransactions);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId]);

  // Calculate total income and expenses
  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'Income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'Expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Welcome to FinWell</h2>
        <p>Track your expenses and manage your finances effectively.</p>
      </header>

      <div className="dashboard-summary">
        <div className="summary-card">
          <FaWallet className="summary-icon" />
          <h3>Total Balance</h3>
          <p className="summary-value">${(totalIncome - totalExpenses).toFixed(2)} </p>
        </div>
        <div className="summary-card">
          <FaArrowUp className="summary-icon" />
          <h3>Total Period Income</h3>
          <p className="summary-value">${totalIncome.toFixed(2)} </p>
        </div>
        <div className="summary-card">
          <FaArrowDown className="summary-icon" />
          <h3>Total Period Expenses</h3>
          <p className="summary-value">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="summary-card">
          <FaChartLine className="summary-icon" />
          <h3>Performance</h3>
          <p className="summary-value">+0.00% this month</p>
        </div>
      </div>

      {/* <Link to="#">
        <button className="add-expense">
          <FaPlusCircle /> Insights
        </button>
      </Link> */}
        <button className="invest" onClick={() => window.location.href = 'https://chat-rouge-ten.vercel.app/'}>
          <FaHandsHelping /> Invest
        </button>

      

      <Chatbot />

      {/* Quote and Investment Sections */}
      <div className="Quote">
        <QuoteButton />
        <InvestmentAreas />
      </div>

      <div className="action-buttons">
        <Link to="/expense-tracker">
          <button className="add-expense">
            <FaPlusCircle /> Add Expense
          </button>
        </Link>
        <Link to="/incomestream">
          <button className="add-wallet">
            <FaWallet /> Add Income
          </button>
        </Link>
        <Link to="/budget">
          <button className="add-wallet">
            <FaWallet /> Budget
          </button>
        </Link>
        <Link to="/wallet">
          <button className="add-wallet">
            <FaWallet /> Add Wallet
          </button>
        </Link>
        <button className="invest" onClick={() => window.location.href = 'https://7fah5-7aaaa-aaaah-qpxvq-cai.icp0.io/'}>
          <FaHandsHelping /> Invest
        </button>
      </div>

      {/* Transactions Table */}
      <div className="transactions">
        <h3>Your Transactions</h3>
        {loading ? (
          <p>Loading transactions...</p>
        ) : transactions.length === 0 ? (
          <p>You have no transactions.</p>
        ) : (
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.description}</td>
                  <td className={transaction.type === 'Income' ? 'income' : 'expense'}>
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td>{transaction.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
