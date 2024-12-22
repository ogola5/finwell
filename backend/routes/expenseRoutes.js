const express = require('express');
const expenseController = require('../controllers/expenseController');

const router = express.Router();

// POST /api/expenses - Add a new expense
router.post('/expenses', expenseController.addExpense);



// GET /api/expenses/user/:userId - Get all expenses for a specific user
router.get('/expenses/user/:userId', expenseController.getUserExpenses);

// GET /api/expenses/user/:userId/categories - Get expenses grouped by category for a specific user
router.get('/user/:userId/categories', expenseController.getUserExpensesByCategory);

// PUT /api/expenses/:id - Update an expense
router.put('/:id', expenseController.updateExpense);

// DELETE /api/expenses/:id - Delete an expense
router.delete('/expenses/:id', expenseController.deleteExpense);

module.exports = router;
