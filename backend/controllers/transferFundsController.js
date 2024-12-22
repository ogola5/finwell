const Wallet = require('../models/Wallet'); // Assuming you have a Wallet model

// Controller for transferring funds between accounts
const transferFundsController = async (req, res) => {
    const { userId } = req.params; // The userId is coming from the frontend or middleware
    const { fromAccount, toAccount, amount } = req.body;

    try {
        const wallet = await Wallet.findOne({ userId });
        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        // Find the fromAccount and toAccount in the wallet
        const fromAccountIndex = wallet.accounts.findIndex(account => account._id.toString() === fromAccount);
        const toAccountIndex = wallet.accounts.findIndex(account => account._id.toString() === toAccount);

        if (fromAccountIndex === -1 || toAccountIndex === -1) {
            return res.status(400).json({ message: 'Invalid account IDs' });
        }

        const fromAccountObj = wallet.accounts[fromAccountIndex];
        const toAccountObj = wallet.accounts[toAccountIndex];

        // Validate the transfer amount
        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be greater than zero' });
        }

        if (fromAccountObj.balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds in source account' });
        }

        if (fromAccount === toAccount) {
            return res.status(400).json({ message: 'Cannot transfer to the same account' });
        }

        // Perform the transfer
        fromAccountObj.balance -= amount;
        toAccountObj.balance += amount;

        // Log transactions for both accounts
        fromAccountObj.transactions.push({
            type: 'Transfer',
            amount,
            date: new Date(),
            description: `Transfer to account ${toAccountObj.accountType}`,
            paymentType: 'Other',
        });

        toAccountObj.transactions.push({
            type: 'Transfer',
            amount,
            date: new Date(),
            description: `Transfer from account ${fromAccountObj.accountType}`,
            paymentType: 'Savings', // Example: Categorized as Savings for the receiving account
        });

        // Save the updated wallet
        await wallet.save();

        // Return the updated wallet
        res.json({ accounts: wallet.accounts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { transferFundsController };


// const Wallet = require('../models/Wallet'); // Assuming you have a Wallet model

// // Controller for transferring funds between accounts
// const transferFundsController = async (req, res) => {
//     const { userId } = req.params;  // The userId is coming from the frontend or middleware
//     const { fromAccount, toAccount, amount } = req.body;

//     try {
//         // Skip the user lookup if you trust that the user is already authenticated
//         const wallet = await Wallet.findOne({ userId });
//         if (!wallet) {
//             return res.status(404).json({ message: 'Wallet not found' });
//         }

//         // Find the fromAccount and toAccount in the wallet
//         const fromAccountIndex = wallet.accounts.findIndex(account => account._id.toString() === fromAccount);
//         const toAccountIndex = wallet.accounts.findIndex(account => account._id.toString() === toAccount);

//         if (fromAccountIndex === -1 || toAccountIndex === -1) {
//             return res.status(400).json({ message: 'Invalid account IDs' });
//         }

//         const fromAccountObj = wallet.accounts[fromAccountIndex];
//         const toAccountObj = wallet.accounts[toAccountIndex];

//         // Validate the transfer amount
//         if (amount <= 0) {
//             return res.status(400).json({ message: 'Amount must be greater than zero' });
//         }

//         if (fromAccountObj.balance < amount) {
//             return res.status(400).json({ message: 'Insufficient funds in source account' });
//         }

//         if (fromAccount === toAccount) {
//             return res.status(400).json({ message: 'Cannot transfer to the same account' });
//         }

//         // Perform the transfer
//         fromAccountObj.balance -= amount;
//         toAccountObj.balance += amount;

//         // Save the updated wallet
//         await wallet.save();

//         // Return the updated wallet
//         res.json({ accounts: wallet.accounts });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// module.exports = { transferFundsController };
