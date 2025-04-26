'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useWallet } from '../../src/contexts/WalletContext';
import { useGiftCardService, GiftCard } from '../../src/services/giftCardService';
import NFTTest from '../../src/components/NFTTest';
import GiftCardActions from '../../src/components/GiftCardActions';
import { ethers } from 'ethers';

export default function Dashboard() {
  const { address, connect, isConnected } = useWallet();
  const { getUserGiftCards, mintGiftCard } = useGiftCardService();
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [cashBalance, setCashBalance] = useState(1000); // Starting with $1000 for prototype
  const [addCashAmount, setAddCashAmount] = useState('');
  const [ethPrice, setEthPrice] = useState<number | null>(null);
  const [priceLoading, setPriceLoading] = useState(true);

  // Form state for minting a new gift card
  const [formData, setFormData] = useState({
    valueUSD: '',
    merchant: '',
    expirationDate: 30, // Default to 30 days
    uri: ''
  });

  // Fetch ETH price from CoinGecko
  const fetchEthPrice = async () => {
    try {
      setPriceLoading(true);
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const data = await response.json();
      setEthPrice(data.ethereum.usd);
    } catch (err) {
      console.error('Error fetching ETH price:', err);
      setError('Failed to fetch ETH price');
    } finally {
      setPriceLoading(false);
    }
  };

  // Fetch price on component mount and every 30 seconds
  useEffect(() => {
    fetchEthPrice();
    const interval = setInterval(fetchEthPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      loadGiftCards();
    }
  }, [isConnected, address]);

  const loadGiftCards = async () => {
    try {
      setLoading(true);
      const cards = await getUserGiftCards();
      setGiftCards(cards);
    } catch (err) {
      console.error('Error loading gift cards:', err);
      setError('Failed to load gift cards');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCash = (e: FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(addCashAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    setCashBalance(prev => prev + amount);
    setAddCashAmount('');
    setSuccess(`Added $${amount.toFixed(2)} to your balance`);
  };

  const handleMintGiftCard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    if (!ethPrice) {
      setError('Unable to fetch current ETH price. Please try again.');
      return;
    }

    const valueUSD = parseFloat(formData.valueUSD);
    if (isNaN(valueUSD) || valueUSD <= 0) {
      setError('Please enter a valid USD amount');
      return;
    }

    if (valueUSD > cashBalance) {
      setError('Insufficient balance');
      return;
    }

    // Convert USD to ETH using live price
    const valueETH = valueUSD / ethPrice;

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      const tokenId = await mintGiftCard(
        valueETH.toString(),
        formData.merchant,
        formData.expirationDate,
        formData.uri
      );
      console.log('Minted gift card with ID:', tokenId);
      
      // Update cash balance
      setCashBalance(prev => prev - valueUSD);
      
      setSuccess('Gift card minted successfully!');
      await loadGiftCards();
      setFormData({
        valueUSD: '',
        merchant: '',
        expirationDate: 30,
        uri: ''
      });
    } catch (err: any) {
      console.error('Error minting gift card:', err);
      setError(err.message || 'Failed to mint gift card');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center">CardSphere Dashboard</h1>
      
      {/* ETH Price Display */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Current ETH Price</h2>
          {priceLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          ) : ethPrice ? (
            <p className="text-2xl font-bold text-blue-600">${ethPrice.toLocaleString()}</p>
          ) : (
            <p className="text-red-500">Failed to load price</p>
          )}
        </div>
      </div>
      
      {/* Wallet Connection */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Wallet Connection</h2>
        {isConnected ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1 text-gray-600">Connected</p>
              <p className="font-mono text-sm bg-gray-100 p-2 rounded inline-block">{address}</p>
            </div>
            <button 
              onClick={connect}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 shadow-sm"
            >
              Reconnect
            </button>
          </div>
        ) : (
          <button 
            onClick={connect}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors duration-200 shadow-sm w-full sm:w-auto"
          >
            Connect Wallet
          </button>
        )}
      </div>
      
      {/* Cash Balance */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Cash Balance</h2>
          <p className="text-2xl font-bold text-green-600">${cashBalance.toFixed(2)}</p>
        </div>
        
        <form onSubmit={handleAddCash} className="flex gap-2">
          <input
            type="number"
            value={addCashAmount}
            onChange={(e) => setAddCashAmount(e.target.value)}
            placeholder="Amount to add"
            className="flex-grow border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            step="0.01"
          />
          <button 
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200 shadow-sm"
          >
            Add Cash
          </button>
        </form>
      </div>
      
      {/* NFT Test Component */}
      {isConnected && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-800"></h2>
          <NFTTest />
        </div>
      )}
      
      {/* Mint Gift Card Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Mint New Gift Card</h2>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4 rounded">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-3 mb-4 rounded">
            <p className="text-green-700 text-sm">{success}</p>
          </div>
        )}
        
        <form onSubmit={handleMintGiftCard} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Value (USD)</label>
              <input
                type="number"
                value={formData.valueUSD}
                onChange={(e) => setFormData({...formData, valueUSD: e.target.value})}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="100.00"
                min="0"
                step="0.01"
                required
              />
              {ethPrice && (
                <p className="text-xs text-gray-500 mt-1">
                  ≈ {(parseFloat(formData.valueUSD || '0') / ethPrice).toFixed(6)} ETH
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Merchant</label>
              <input
                type="text"
                value={formData.merchant}
                onChange={(e) => setFormData({...formData, merchant: e.target.value})}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Amazon"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Expiration (days)</label>
              <input
                type="number"
                value={formData.expirationDate}
                onChange={(e) => setFormData({...formData, expirationDate: parseInt(e.target.value)})}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">URI (optional)</label>
              <input
                type="text"
                value={formData.uri}
                onChange={(e) => setFormData({...formData, uri: e.target.value})}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://..."
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button 
              type="submit"
              disabled={loading || !isConnected || !ethPrice}
              className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
                loading || !isConnected || !ethPrice
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-green-600 text-white shadow-sm'
              }`}
            >
              {loading ? 'Processing...' : 'Mint Gift Card'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Gift Cards List */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Gift Cards</h2>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
            <p className="text-red-700">{error}</p>
          </div>
        ) : giftCards.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>You don't have any gift cards yet.</p>
            <p className="text-sm mt-2">Mint a gift card to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {giftCards.map((card) => (
              <div key={card.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-800">{card.merchant}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    card.isExpired ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {card.isExpired ? 'Expired' : 'Valid'}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600">
                    <span className="font-medium">Value:</span> ${(parseFloat(card.value) * (ethPrice || 0)).toFixed(2)} USD
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Expires:</span> {new Date(card.expirationDate * 1000).toLocaleDateString()}
                  </p>
                </div>
                <GiftCardActions 
                  giftCard={card} 
                  onActionComplete={loadGiftCards} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 