import { useState } from 'react';
import AddressInput from '../components/AddressInput';
import { getAddressTransactions, getTokenBalances } from '../lib/alchemy';

export default function AddressTest() {
  const [address, setAddress] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [transactions, setTransactions] = useState<any>(null);
  const [tokenBalances, setTokenBalances] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddressChange = (newAddress: string, valid: boolean) => {
    setAddress(newAddress);
    setIsValid(valid);
    setTransactions(null);
    setTokenBalances(null);
    setError(null);
  };

  const fetchData = async () => {
    if (!isValid) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch transactions
      const txData = await getAddressTransactions(address);
      setTransactions(txData);
      
      // Fetch token balances
      const balanceData = await getTokenBalances(address);
      setTokenBalances(balanceData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Ethereum Address Validator</h1>
        
        <AddressInput 
          onAddressChange={handleAddressChange}
          placeholder="Enter an Ethereum address to validate"
        />
        
        <div className="mt-6">
          <button
            onClick={fetchData}
            disabled={!isValid || loading}
            className={`px-4 py-2 rounded-md ${
              isValid && !loading
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? 'Loading...' : 'Fetch Data'}
          </button>
        </div>
        
        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {transactions && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Transactions</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <p>Found {transactions.transfers?.length || 0} transfers</p>
              {transactions.transfers?.slice(0, 5).map((tx: any, index: number) => (
                <div key={index} className="mt-2 p-2 border-b">
                  <p>From: {tx.from}</p>
                  <p>To: {tx.to}</p>
                  <p>Value: {tx.value} {tx.asset}</p>
                  <p>Category: {tx.category}</p>
                </div>
              ))}
              {transactions.transfers?.length > 5 && (
                <p className="mt-2 text-sm text-gray-500">
                  Showing 5 of {transactions.transfers.length} transfers
                </p>
              )}
            </div>
          </div>
        )}
        
        {tokenBalances && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Token Balances</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <p>Found {tokenBalances.tokenBalances?.length || 0} tokens</p>
              {tokenBalances.tokenBalances?.slice(0, 5).map((token: any, index: number) => (
                <div key={index} className="mt-2 p-2 border-b">
                  <p>Token: {token.contractAddress}</p>
                  <p>Balance: {token.tokenBalance}</p>
                </div>
              ))}
              {tokenBalances.tokenBalances?.length > 5 && (
                <p className="mt-2 text-sm text-gray-500">
                  Showing 5 of {tokenBalances.tokenBalances.length} tokens
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 