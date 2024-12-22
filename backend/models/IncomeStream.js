const mongoose = require('mongoose');

const incomeStreamSchema = new mongoose.Schema({
  dateReceived: {
    type: Date,
    required: true,
    default: Date.now,
  },
  source: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  account: {
    type: String,
    required: true,
    enum: ['Bank', 'Cash', 'Digital Wallet', 'Other'], // Restrict to certain account types
    default: 'Other',
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    enum: ['Salary', 'Business', 'Gift', 'Investment', 'Bonus', 'Other', 'commissions'],
    default: 'Other',
  },
  isRecurring: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Ensure income is linked to a user
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

incomeStreamSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const IncomeStream = mongoose.model('IncomeStream', incomeStreamSchema);
module.exports = IncomeStream;