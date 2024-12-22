const mongoose = require('mongoose');
const Wallet = require('../models/Wallet');  // Assuming you have this model imported

// Add account to wallet

const accountSchema = {
  accountType: ['Bank', 'Mobile Money', 'PayPal', 'Cash', 'Binance'],
};
exports.addAccount = async (req, res) => {
  const { userId } = req.params;
  const newAccount = req.body;
  console.log('New Account:', newAccount);

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid userId' });
  }

  try {
    // Validate accountType
    if (!accountSchema.accountType.includes(newAccount.accountType)) {
      return res.status(400).json({ message: 'Invalid account type' });
    }

    let wallet = await Wallet.findOne({ userId: new mongoose.Types.ObjectId(userId) });

    console.log('Fetching Wallet for User ID:', userId);

    console.log('Wallet Found:', wallet);

    if (!wallet) {
      wallet = new Wallet({ userId, accounts: [], totalBalance: 0 }); // Create a new wallet if none exists
    }
    wallet.accounts.push(newAccount);
    wallet.totalBalance += newAccount.balance || 0; // Ensure balance is added if provided
    await wallet.save();
    res.status(200).json(wallet);
  } catch (error) {
    console.error('Error adding account:', error);
    res.status(500).json({ message: 'Error adding account', error: error.message });
  }
};


// Update account balance
exports.updateBalance = async (req, res) => {
  const { userId, accountId } = req.params;
  const { balance } = req.body;

  try {
    const wallet = await Wallet.findOne({ userId });
    const account = wallet.accounts.id(accountId);
    wallet.totalBalance -= account.balance;  // Remove old balance
    account.balance = balance;  // Update to new balance
    wallet.totalBalance += balance;  // Add new balance
    await wallet.save();
    res.status(200).json(wallet);
  } catch (error) {
    res.status(500).json({ message: 'Error updating balance' });
  }
};

// Get wallet details
exports.getWallet = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const wallet = await Wallet.findOne({ userId });
      if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' });
      }
      res.status(200).json(wallet);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching wallet' });
    }
  };
  

  