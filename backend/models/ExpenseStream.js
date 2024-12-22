const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Links the expense to a specific user
  },
  date: {
    type: Date,
    required: true,
    default: Date.now, // Automatically sets to the current date if not provided
  },
  description: {
    type: String,
    required: true, // Short description of the expense
  },
  account: {
    type: String,
    required: true, // Account the money is drawn from (e.g., Bank, Cash)
    enum: ['Bank', 'Cash', 'Credit Card', 'Other'],
  },
  category: {
    type: String,
    required: true, // Type of expense
    enum: ['Food', 'Clothing', 'Fuel', 'Entertainment', 'Healthcare', 'Utilities', 'Education', 'Rent', 'Savings', 'Debt Repayment', 'Other'],
  },
  subCategory: {
    type: String, // Optional field for detailed categorization
    default: 'General', // Example: "Groceries" under "Food"
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'Digital Wallet'],
    required: true,
  },
  amount: {
    type: Number,
    required: true, // Total expense amount
  },
  isRecurring: {
    type: Boolean,
    default: false, // Tracks if the expense is recurring
  },
  notes: {
    type: String, // Additional information about the expense
  },
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
