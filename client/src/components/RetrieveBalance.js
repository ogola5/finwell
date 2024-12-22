import React, { useState } from 'react';
import './RetrieveBalance.css'; // Import the external CSS file

const RetrieveBalance = ({ accountId, userId }) => {
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBalance = async () => {
        setLoading(true);
        setError(null);
        try {
            const bankResponse = await fetch(`http://localhost:5000/api/bank/${userId}/balance`);
            const mpesaResponse = await fetch(`http://localhost:5000/api/mpesa/${accountId}/balance`);

            if (!bankResponse.ok || !mpesaResponse.ok) {
                throw new Error('Failed to retrieve balances');
            }

            const bankData = await bankResponse.json();
            const mpesaData = await mpesaResponse.json();

            setBalance({
                bankBalance: bankData.balance,
                mpesaBalance: mpesaData.balance,
            });
        } catch (error) {
            setError('Error fetching balance');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="retrieve-balance-container">
            <button
                onClick={fetchBalance}
                disabled={loading}
                className="retrieve-balance-button"
            >
                {loading ? (
                    <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Fetching Balance...
                    </>
                ) : (
                    <>
                        <i className="fas fa-wallet"></i>
                        Retrieve Balance
                    </>
                )}
            </button>
            {error && <p className="retrieve-balance-error"><i className="fas fa-exclamation-circle"></i> {error}</p>}
            {balance && (
                <div className="balance-container">
                    <p className="balance">
                        <i className="fas fa-university"></i> 
                        Bank Balance: <span className="balance-value">${balance.bankBalance}</span>
                    </p>
                    <p className="balance">
                        <i className="fas fa-mobile-alt"></i> 
                        MPESA Balance: <span className="balance-value">${balance.mpesaBalance}</span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default RetrieveBalance;
