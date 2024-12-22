// const Expense = require('../models/ExpenseStream');

// Add a new expense
// exports.addExpense = async (req, res) => {
//   try {
//     const expense = new Expense(req.body); // Assume the request body contains the expense data
//     console.log(req.body)
//     await expense.save();
//     res.status(201).json({ message: 'Expense added successfully', expense });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to add expense', details: error.message });
//   }
// };

const Expense = require('../models/ExpenseStream');
const Wallet = require('../models/Wallet');

// Add a new expense and deduct from the wallet balance
exports.addExpense = async (req, res) => {
  try {
    const { userId, amount, account, category, paymentMethod } = req.body;

    // Step 1: Create a new expense
    const expense = new Expense(req.body);
    await expense.save();

    // Step 2: Deduct amount from the wallet
    const wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      return res.status(400).json({ error: 'Wallet not found for this user.' });
    }

    const accountToUpdate = wallet.accounts.find(acc => acc.accountType === account);
    
    if (!accountToUpdate || accountToUpdate.balance < amount) {
      return res.status(400).json({ error: 'Insufficient funds in the selected account.' });
    }

    // Deduct the amount
    accountToUpdate.balance -= amount;
    
    // Record the transaction in wallet
    accountToUpdate.transactions.push({
      type: 'Payment',
      amount: amount,
      description: `Expense payment for ${category} - ${paymentMethod}`,
      accountType: account,
      paymentType: 'Expense',
    });

    // Update the wallet total balance
    wallet.totalBalance -= amount;
    await wallet.save();

    // Respond with the added expense
    res.status(201).json({ message: 'Expense added and payment deducted successfully', expense });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add expense and update wallet', details: error.message });
  }
};


// Fetch all expenses for a specific user
exports.getUserExpenses = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    const expenses = await Expense.find({ userId }).sort({ date: -1 }); // Sort by most recent
    console.log('Fetched Expenses:', expenses);
    res.status(200).json(expenses);
    console.log(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expenses', details: error.message });
  }
};

// Fetch expenses grouped by category for a specific user
exports.getUserExpensesByCategory = async (req, res) => {
  try {
    const { userId } = req.params;
    const expenses = await Expense.aggregate([
      { $match: { userId: userId } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
      { $sort: { total: -1 } },
    ]);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch expenses by category', details: error.message });
  }
};

// Update an expense
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.status(200).json({ message: 'Expense updated successfully', expense: updatedExpense });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update expense', details: error.message });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete expense', details: error.message });
  }
};
