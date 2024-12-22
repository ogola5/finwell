const Wallet = require('../models/Wallet');

const handlePayment = async (req, res) => {
    const { userId } = req.params;
    const { fromAccount, amount, recipient, description, transactionType, paymentType } = req.body;

    if (!fromAccount || !amount || !recipient || !transactionType || !paymentType) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const wallet = await Wallet.findOne({ userId });

        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found' });
        }

        const fromAccountData = wallet.accounts.find(account => account._id.toString() === fromAccount);

        if (!fromAccountData) {
            return res.status(400).json({ message: 'From account not found' });
        }

        if (fromAccountData.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Deduct the amount from the balance
        fromAccountData.balance -= parseFloat(amount);

        // Add a new transaction
        const newTransaction = {
            type: transactionType,
            amount: parseFloat(amount),
            description,
            accountType: fromAccountData.accountType,
            paymentType,
        };

        fromAccountData.transactions.push(newTransaction);

        // Save the wallet
        await wallet.save();

        return res.json({ accounts: wallet.accounts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { handlePayment };
