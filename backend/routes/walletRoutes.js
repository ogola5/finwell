const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const { handlePayment } = require('../controllers/paymentController');
const { transferFundsController } = require('../controllers/transferFundsController');
const { withdrawFundsController } = require('../controllers/withdrawFundsController');
const { buyAirtimeController } = require('../controllers/buyAirtimeController');
// Route to get wallet details
router.get('/wallet/:userId', walletController.getWallet);

// Route to add account
router.post('/wallet/:userId/add', walletController.addAccount);

// Route to update balance
router.post('/wallet/:userId/update/:accountId', walletController.updateBalance);


// POST request to make a payment
router.post('/wallet/:userId/pay', handlePayment);


// Transfer funds between accounts
router.post('/wallet/:userId/transfer', transferFundsController);

// Withdraw funds route
router.post('/wallet/:userId/withdraw', withdrawFundsController);

// Buy airtime route
router.post('/wallet/:userId/buyAirtime', buyAirtimeController);

module.exports = router;
