const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // Links budget to a specific user
  },
  totalMonthlyLimit: {
    type: Number,
    required: true, // Sets a total spending limit for the month
    min: 0,
  },
  categoryLimits: [
    {
      category: {
        type: String,
        required: true,
        enum: ['Food', 'Clothing', 'Fuel', 'Entertainment', 'Rent', 'Utilities', 'Other'], // Categories for expenses
      },
      limit: {
        type: Number,
        required: true,
        min: 0,
      },
    },
  ],
  notifyWhenApproaching: {
    type: Boolean,
    default: true, // Notify user when close to exceeding the budget
  },
  notificationThreshold: {
    type: Number,
    default: 90, // Percentage of the limit that triggers a notification
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

budgetSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Budget = mongoose.model('Budget', budgetSchema);
module.exports = Budget;
