// const Wallet = require('../models/Wallet'); // Assuming you have a Wallet model

// // Controller for withdrawing funds from an account
// const withdrawFundsController = async (req, res) => {
//     const { userId } = req.params;
//     const { fromAccount, amount } = req.body;

//     try {
//         // Fetch the user's wallet
//         const wallet = await Wallet.findOne({ userId });
//         if (!wallet) {
//             return res.status(404).json({ message: 'Wallet not found' });
//         }

//         // Find the fromAccount in the wallet
//         const fromAccountIndex = wallet.accounts.findIndex(account => account._id.toString() === fromAccount);
//         if (fromAccountIndex === -1) {
//             return res.status(400).json({ message: 'Invalid account ID' });
//         }

//         const fromAccountObj = wallet.accounts[fromAccountIndex];

//         // Validate the withdrawal amount
//         if (amount <= 0) {
//             return res.status(400).json({ message: 'Amount must be greater than zero' });
//         }

//         if (fromAccountObj.balance < amount) {
//             return res.status(400).json({ message: 'Insufficient funds in account' });
//         }

//         // Perform the withdrawal
//         fromAccountObj.balance -= amount;

//         // Save the updated wallet
//         await wallet.save();

//         // Return the updated wallet
//         res.json({ accounts: wallet.accounts });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

// module.exports = { withdrawFundsController };

const Wallet = require('../models/Wallet');

// Controller for withdrawing funds from an account
const withdrawFundsController = async (req, res) => {
    const { userId } = req.params;
    const { fromAccount, amount } = req.body;

    try {
        // Fetch the user's wallet
        const wallet = await Wallet.findOne({ userId });
        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        // Find the account to withdraw from
        const fromAccountIndex = wallet.accounts.findIndex(account => account._id.toString() === fromAccount);
        if (fromAccountIndex === -1) {
            return res.status(400).json({ message: 'Invalid account ID' });
        }

        const fromAccountObj = wallet.accounts[fromAccountIndex];

        // Find the cash account
        const cashAccount = wallet.accounts.find(account => account.accountType === 'Cash');
        if (!cashAccount) {
            return res.status(400).json({ message: 'Cash account not found' });
        }

        // Validate the withdrawal amount
        if (amount <= 0) {
            return res.status(400).json({ message: 'Amount must be greater than zero' });
        }

        if (fromAccountObj.balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds in account' });
        }

        // Deduct from the selected account
        fromAccountObj.balance -= amount;
        fromAccountObj.transactions.push({
            type: 'Withdraw',
            amount,
            description: `Withdrawal to Cash`,
            paymentType: 'Expense',
        });

        // Add to the cash account
        cashAccount.balance += amount;
        cashAccount.transactions.push({
            type: 'Deposit',
            amount,
            description: `Deposit from ${fromAccountObj.accountType}`,
            paymentType: 'Other',
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

module.exports = { withdrawFundsController };

