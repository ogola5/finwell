const express = require('express');
const incomeController = require('../controllers/incomeController');

const router = express.Router();

// Middleware: Authentication (ensure userId is retrieved)
// Add your authentication middleware if userId comes from a token.

// 1. Create a new income stream
router.post('/income', incomeController.createIncomeStream);

// 2. Get all income streams for a user
router.get('/income/:userId', incomeController.getIncomeStreams);

// 3. Update an income stream
router.put('/income/:id', incomeController.updateIncomeStream);

// 4. Delete an income stream
router.delete('/income/:id', incomeController.deleteIncomeStream);

// 5. Get total income for insights
router.get('/income/total/:userId', incomeController.getTotalIncome);

module.exports = router;
