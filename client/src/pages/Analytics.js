import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, Legend } from 'recharts';
import { FaUtensils, FaTaxi, FaPlug, FaRegCircle } from 'react-icons/fa';
import './Analytics.css';

const Analytics = () => {
  // Example data for expenses and income over time
  const expenseData = {
    totalExpenses: 1100,
    categories: [
      { name: 'Food', value: 500, color: '#FF8042' },
      { name: 'Transport', value: 200, color: '#00C49F' },
      { name: 'Utilities', value: 300, color: '#0088FE' },
      { name: 'Others', value: 100, color: '#FFBB28' },
    ],
  };

  const incomeData = {
    totalIncome: 5000,
    categories: [
      { name: 'Salary', value: 4000 },
      { name: 'Freelance', value: 800 },
      { name: 'Investments', value: 200 },
    ],
  };

  const timeSeriesData = [
    { date: '2024-12-01', income: 400, expense: 200 },
    { date: '2024-12-02', income: 600, expense: 150 },
    { date: '2024-12-03', income: 500, expense: 300 },
    { date: '2024-12-04', income: 700, expense: 250 },
    { date: '2024-12-05', income: 800, expense: 350 },
  ];

  return (
    <div className="analytics">
      <h2>Analytics</h2>

      {/* Expense Summary */}
      <div className="summary">
        <h3>Total Expenses: ${expenseData.totalExpenses}</h3>
        <PieChart width={300} height={300}>
          <Pie
            data={expenseData.categories}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {expenseData.categories.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <div className="category-summary">
          {expenseData.categories.map((category, index) => (
            <p key={index} style={{ color: category.color }}>
              {category.name}: ${category.value}
            </p>
          ))}
        </div>
      </div>

      {/* Income Summary */}
      <div className="income-summary">
        <h3>Total Income: ${incomeData.totalIncome}</h3>
        <BarChart width={500} height={300} data={incomeData.categories}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </div>

      {/* Income vs Expense Over Time */}
      <div className="time-summary">
        <h3>Income vs Expense Over Time</h3>
        <LineChart width={600} height={300} data={timeSeriesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#82ca9d" name="Income" />
          <Line type="monotone" dataKey="expense" stroke="#ff7300" name="Expense" />
        </LineChart>
      </div>
    </div>
  );
};

export default Analytics;
