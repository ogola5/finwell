const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  accounts: [
    {
      accountType: { type: String, enum: ['Bank', 'Mobile Money', 'PayPal', 'Cash', 'Binance'], required: true },
      accountDetails: {
        bankName: { type: String, required: false },
        accountNumber: { type: String, required: false },
        paypalEmail: { type: String, required: false },
        moneyType: { type: String, required: false },
        mobileNumber: { type: String, required: false },
        binanceAccount: { type: String, required: false },
      },
      balance: { type: Number, default: 0 },
      transactions: [
        {
          type: { type: String, enum: ['Deposit', 'Withdraw', 'Transfer', 'Payment'], required: true },
          amount: { type: Number, required: true },
          date: { type: Date, default: Date.now },
          description: { type: String, required: false },
          accountType: { type: String, required: false },
          paymentType: { type: String, enum: ['Expense', 'Investment', 'Business', 'Savings', 'Debt', 'Other'], required: true },
        },
      ],
    },
  ],
  totalBalance: { type: Number, default: 0 },
});

const Wallet = mongoose.model('Wallet', walletSchema);
module.exports = Wallet;
