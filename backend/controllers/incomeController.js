const IncomeStream = require('../models/IncomeStream');
const mongoose = require('mongoose');

// 1. Create a new income stream
exports.createIncomeStream = async (req, res) => {
  try {
    const { dateReceived, source, description, account, amount, category, isRecurring, userId } = req.body;
    // Validate that amount is a number and dateReceived is valid
    console.log(req.body)
    if (isNaN(amount)) {
      return res.status(400).json({ message: 'Amount must be a number' });
    }
    const newIncomeStream = new IncomeStream({
      dateReceived,
      source,
      description,
      account,
      amount,
      category,
      isRecurring,
      userId,
    });
  console.log(newIncomeStream);
    const savedIncome = await newIncomeStream.save();
    res.status(201).json(savedIncome);
  } catch (err) {
    res.status(500).json({ message: 'Error saving income stream', error: err.message });
  }
};

// 2. Get all income streams for a user
exports.getIncomeStreams = async (req, res) => {
  try {
    const { userId } = req.params;

    const incomes = await IncomeStream.find({ userId }).sort({ dateReceived: -1 });
    res.status(200).json(incomes);
    console.log(incomes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching income streams', error: err.message });
  }
};

// 3. Update an income stream
exports.updateIncomeStream = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedIncome = await IncomeStream.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedIncome) return res.status(404).json({ message: 'Income stream not found' });
    res.status(200).json(updatedIncome);
  } catch (err) {
    res.status(500).json({ message: 'Error updating income stream', error: err.message });
  }
};

// 4. Delete an income stream
exports.deleteIncomeStream = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedIncome = await IncomeStream.findByIdAndDelete(id);
    if (!deletedIncome) return res.status(404).json({ message: 'Income stream not found' });

    res.status(200).json({ message: 'Income stream deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting income stream', error: err.message });
  }
};

// 5. Get total income for insights
exports.getTotalIncome = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate if userId is valid
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }

    // Perform aggregation to calculate total income
    const totalIncome = await IncomeStream.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: null, totalAmount: { $sum: '$amount' } } },
    ]);

    // Send the response with the total amount or 0 if no data found
    res.status(200).json({ total: totalIncome[0]?.totalAmount || 0 });
  } catch (err) {
    // Log the error for debugging
    console.error('Error fetching total income:', err);
    res.status(500).json({
      message: 'Error calculating total income',
      error: err.message,
      stack: err.stack,  // Include the stack trace for more details
    });
  }
};
