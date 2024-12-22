import React, { useState } from 'react';
import './Pay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faWallet,
    faDollarSign,
    faUser,
    faCommentAlt,
    faExchangeAlt,
    faClipboardList,
} from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';


const Pay = ({ wallet, setWallet, userId }) => {
    const [fromAccount, setFromAccount] = useState('');
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [description, setDescription] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePayment = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:5000/api/wallet/${userId}/pay`, {
                method: 'POST',
                body: JSON.stringify({
                    fromAccount,
                    amount,
                    recipient,
                    description,
                    transactionType,
                    paymentType,
                }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Payment failed');
            }

            const updatedWallet = await response.json();
            setWallet(updatedWallet.accounts);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pay-container">
            <h2>Make a Payment</h2>

            <div className="input-group">
                <FontAwesomeIcon icon={faWallet} className="icon" />
                <select onChange={(e) => setFromAccount(e.target.value)} value={fromAccount}>
                    <option value="">Select From Account</option>
                    {wallet.map((account) => (
                        <option key={account._id} value={account._id}>
                            {account.accountType} - Balance: {account.balance}
                        </option>
                    ))}
                </select>
            </div>

            <div className="input-group">
                <FontAwesomeIcon icon={faDollarSign} className="icon" />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>

            <div className="input-group">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <input
                    type="text"
                    placeholder="Recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                />
            </div>

            <div className="input-group">
                <FontAwesomeIcon icon={faCommentAlt} className="icon" />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="input-group">
                <FontAwesomeIcon icon={faExchangeAlt} className="icon" />
                <select onChange={(e) => setTransactionType(e.target.value)} value={transactionType}>
                    <option value="">Select Transaction Type</option>
                    <option value="Deposit">Deposit</option>
                    <option value="Withdraw">Withdraw</option>
                    <option value="Transfer">Transfer</option>
                    <option value="Payment">Payment</option>
                </select>
            </div>

            <div className="input-group">
                <FontAwesomeIcon icon={faClipboardList} className="icon" />
                <select onChange={(e) => setPaymentType(e.target.value)} value={paymentType}>
                    <option value="">Select Payment Type</option>
                    <option value="Expense">Expense</option>
                    <option value="Investment">Investment</option>
                    <option value="Business">Business</option>
                    <option value="Savings">Savings</option>
                    <option value="Debt">Debt</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <button onClick={handlePayment} disabled={loading}>
                {loading ? 'Processing Payment...' : 'Pay'}
            </button>

            {error && <p>{error}</p>}
        </div>
    );
};

export default Pay;
