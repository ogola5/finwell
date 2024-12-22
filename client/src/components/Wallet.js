import React, { useState, useEffect } from 'react';
import './Wallet.css';
import RetrieveBalance from './RetrieveBalance';
import Transfer from './Transfer';
import Pay from './Pay';
import Withdraw from './Withdraw';
import BuyAirtime from './BuyAirtime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMoneyBillWave, faPhoneAlt, faExchangeAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Wallet = () => {
    const [userId, setUserId] = useState(null);
    const [wallet, setWallet] = useState([]);
    const [totalBalance, setTotalBalance] = useState(0);
    const [newAccount, setNewAccount] = useState({
        accountType: '',
        accountDetails: {},
        balance: 0,
    });
    const [loading, setLoading] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserId(user.id);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            const fetchWallet = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/api/wallet/${userId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch wallet');
                    }
                    const data = await response.json();
                    setWallet(Array.isArray(data.accounts) ? data.accounts : []);
                    setTotalBalance(calculateTotalBalance(data.accounts));
                } catch (error) {
                    console.error('Error fetching wallet:', error);
                    setWallet([]);
                }
            };
            fetchWallet();
        }
    }, [userId]);

    const calculateTotalBalance = (accounts) => {
        return accounts.reduce((total, account) => total + account.balance, 0);
    };

    const handleAddAccount = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/wallet/${userId}/add`, {
                method: 'POST',
                body: JSON.stringify(newAccount),
                headers: { 'Content-Type': 'application/json' },
            });
            const updatedWallet = await response.json();
            setWallet(updatedWallet.accounts);
            setTotalBalance(calculateTotalBalance(updatedWallet.accounts));
        } catch (error) {
            console.error('Error adding account:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setTotalBalance(calculateTotalBalance(wallet));
    }, [wallet]);

    return (
        <div className="wallet-container">
            <h2>Your Wallet</h2>

            <div className="add-account">
                <h3>Add Account <FontAwesomeIcon icon={faPlusCircle} /></h3>
                <select
                    value={newAccount.accountType}
                    onChange={(e) => setNewAccount({ ...newAccount, accountType: e.target.value })}
                >
                    <option value="">Select Account Type</option>
                    <option value="Bank">Bank</option>
                    <option value="Mobile Money">Mobile Money</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Cash">Cash</option>
                    <option value="Binance">Binance</option>
                </select>
                {/* Additional account fields */}
                <button onClick={handleAddAccount} disabled={loading}>
                    {loading ? 'Adding Account...' : 'Add Account'} <FontAwesomeIcon icon={faPlusCircle} />
                </button>
            </div>

            <div className="accounts">
                <h3>Your Accounts</h3>
                {wallet.length === 0 ? (
                    <p>No accounts added yet.</p>
                ) : (
                    wallet.map((account) => (
                        <div key={account._id}>
                            <h4>{account.accountType}</h4>
                            <p>Balance: {account.balance}</p>
                            <div>
                                <button onClick={() => setSelectedAction('RetrieveBalance')}>
                                    <FontAwesomeIcon icon={faMoneyBillWave} /> Retrieve Balance
                                </button>
                                <button onClick={() => setSelectedAction('Pay')}>
                                    <FontAwesomeIcon icon={faPhoneAlt} /> Pay
                                </button>
                                <button onClick={() => setSelectedAction('Transfer')}>
                                    <FontAwesomeIcon icon={faExchangeAlt} /> Transfer
                                </button>
                                <button onClick={() => setSelectedAction('Withdraw')}>
                                    <FontAwesomeIcon icon={faMoneyBillWave} /> Withdraw
                                </button>
                                <button onClick={() => setSelectedAction('BuyAirtime')}>
                                    <FontAwesomeIcon icon={faShoppingCart} /> Buy Airtime
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="total-balance">
                <h3>Total Balance: {totalBalance}</h3>
            </div>

            {selectedAction === 'RetrieveBalance' && <RetrieveBalance accountId="123" userId={userId} />}
            {selectedAction === 'Transfer' && <Transfer wallet={wallet} setWallet={setWallet} userId={userId} />}
            {selectedAction === 'Pay' && <Pay wallet={wallet} setWallet={setWallet} userId={userId} />}
            {selectedAction === 'Withdraw' && <Withdraw wallet={wallet} setWallet={setWallet} userId={userId} />}
            {selectedAction === 'BuyAirtime' && <BuyAirtime wallet={wallet} setWallet={setWallet} userId={userId} />}
        </div>
    );
};

export default Wallet;
