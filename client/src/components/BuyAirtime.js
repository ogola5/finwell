import React, { useState } from 'react';
import { FaPhone, FaMoneyBillAlt, FaShoppingCart } from 'react-icons/fa';
import './BuyAirtime.css';

const BuyAirtime = ({ wallet, setWallet, userId }) => {
    const [fromAccount, setFromAccount] = useState('');
    const [amount, setAmount] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleBuyAirtime = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:5000/api/wallet/${userId}/buyAirtime`, {
                method: 'POST',
                body: JSON.stringify({ fromAccount, amount, mobileNumber }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Airtime purchase failed');
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
        <div className="buy-airtime-container">
            <h2>Buy Airtime</h2>

            <div className="form-group">
                <label>Select Account</label>
                <select
                    className="select-account"
                    onChange={(e) => setFromAccount(e.target.value)}
                    value={fromAccount}
                >
                    <option value="">Select Account</option>
                    {wallet.map((account) => (
                        <option key={account._id} value={account._id}>
                            {account.accountType} - Balance: ${account.balance}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Mobile Number</label>
                <div className="input-with-icon">
                    <FaPhone className="input-icon" />
                    <input
                        className="input-field"
                        type="text"
                        placeholder="Mobile Number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                    />
                </div>
            </div>

            <div className="form-group">
                <label>Airtime Amount</label>
                <div className="input-with-icon">
                    <FaMoneyBillAlt className="input-icon" />
                    <input
                        className="input-field"
                        type="number"
                        placeholder="Airtime Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
            </div>

            <button
                className="purchase-button"
                onClick={handleBuyAirtime}
                disabled={loading}
            >
                {loading ? <span>Loading...</span> : <><FaShoppingCart /> Buy Airtime</>}
            </button>

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default BuyAirtime;
