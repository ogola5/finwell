const express = require('express');
const { createBudget, getBudgets, updateBudget, deleteBudget } = require('../controllers/budgetController');
const router = express.Router();

// Create a new budget
router.post('/budget', createBudget);

// Get all budgets for a user
router.get('/budget/:userId', getBudgets);

// Update a budget
router.put('/budget/:budgetId', updateBudget);

// Delete a budget
router.delete('/budget/:budgetId', deleteBudget);

module.exports = router;
