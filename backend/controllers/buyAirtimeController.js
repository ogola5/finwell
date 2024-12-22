const Wallet = require('../models/Wallet'); // Assuming you have a Wallet model

// Controller for purchasing airtime
const buyAirtimeController = async (req, res) => {
    const { userId } = req.params;
    const { fromAccount, amount, mobileNumber } = req.body;

    try {
        // Fetch the user's wallet
        const wallet = await Wallet.findOne({ userId });
        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        // Find the fromAccount in the wallet
        const accountIndex = wallet.accounts.findIndex(account => account._id.toString() === fromAccount);
        if (accountIndex === -1) {
            return res.status(400).json({ message: 'Invalid account ID' });
        }

        const account = wallet.accounts[accountIndex];

        // Validate the airtime purchase amount
        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be greater than zero' });
        }

        if (account.balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds in account' });
        }

        // Deduct the airtime amount from the account balance
        account.balance -= amount;

        // Create a new transaction for the airtime purchase
        const transaction = {
            type: 'Payment', // Transaction type
            amount, // Amount spent
            date: new Date(),
            description: `Airtime purchase for mobile number ${mobileNumber}`,
            accountType: account.accountType, // Account type (e.g., Mobile Money)
            paymentType: 'Expense', // Since it's an expense
        };

        // Add the transaction to the account's transactions
        account.transactions.push(transaction);

        // Update the total balance (if necessary)
        wallet.totalBalance -= amount;

        // Save the updated wallet with the transaction
        await wallet.save();

        // Return the updated wallet
        res.json({ accounts: wallet.accounts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { buyAirtimeController };
