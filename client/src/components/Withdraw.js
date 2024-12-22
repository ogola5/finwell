import React, { useState } from 'react';
import './Withdraw.css'; // Import the external CSS file

const Withdraw = ({ wallet, setWallet, userId }) => {
    const [fromAccount, setFromAccount] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleWithdraw = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:5000/api/wallet/${userId}/withdraw`, {
                method: 'POST',
                body: JSON.stringify({ fromAccount, amount }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                const errMessage = await response.json();
                throw new Error(errMessage.message || 'Withdrawal failed');
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
        <div className="withdraw-container">
            <select
                className="withdraw-select"
                onChange={(e) => setFromAccount(e.target.value)}
                value={fromAccount}
            >
                <option value="">Select Account to Withdraw</option>
                {wallet.map((account) => (
                    <option key={account._id} value={account._id}>
                        {account.accountType} - Balance: {account.balance}
                    </option>
                ))}
            </select>

            <input
                type="number"
                className="withdraw-input"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <button
                className="withdraw-button"
                onClick={handleWithdraw}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Processing Withdrawal...
                    </>
                ) : (
                    <>
                        <i className="fas fa-money-bill-alt"></i>
                        Withdraw
                    </>
                )}
            </button>

            {error && <p className="withdraw-error"><i className="fas fa-exclamation-circle"></i> {error}</p>}
        </div>
    );
};

export default Withdraw;
