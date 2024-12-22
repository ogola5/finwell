const Budget = require('../models/Budget');

// Create a new budget
exports.createBudget = async (req, res) => {
  try {
    const { userId, totalMonthlyLimit, categoryLimits, notifyWhenApproaching, notificationThreshold } = req.body;

    const budget = new Budget({
      userId,
      totalMonthlyLimit,
      categoryLimits,
      notifyWhenApproaching,
      notificationThreshold,
    });

    const savedBudget = await budget.save();
    res.status(201).json(savedBudget);
  } catch (error) {
    res.status(500).json({ message: 'Error creating budget', error });
  }
};

// Get all budgets for a user
exports.getBudgets = async (req, res) => {
  try {
    const { userId } = req.params;
    const budgets = await Budget.find({ userId });

    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving budgets', error });
  }
};

// Update a budget
exports.updateBudget = async (req, res) => {
  try {
    const { budgetId } = req.params;
    const updates = req.body;

    const updatedBudget = await Budget.findByIdAndUpdate(budgetId, updates, { new: true });
    res.status(200).json(updatedBudget);
  } catch (error) {
    res.status(500).json({ message: 'Error updating budget', error });
  }
};

// Delete a budget
exports.deleteBudget = async (req, res) => {
  try {
    const { budgetId } = req.params;

    await Budget.findByIdAndDelete(budgetId);
    res.status(200).json({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting budget', error });
  }
};
