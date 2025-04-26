'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useWallet } from '../../src/contexts/WalletContext';
import { useGiftCardService, GiftCard } from '../../src/services/giftCardService';
import NFTTest from '../../src/components/NFTTest';

export default function Dashboard() {
  const { address, connect, isConnected } = useWallet();
  const { getUserGiftCards, mintGiftCard } = useGiftCardService();
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state for minting a new gift card
  const [formData, setFormData] = useState({
    value: '',
    merchant: '',
    expirationDate: 30, // Default to 30 days
    uri: ''
  });

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

  const handleMintGiftCard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    try {
      setLoading(true);
      const tokenId = await mintGiftCard(
        formData.value,
        formData.merchant,
        formData.expirationDate,
        formData.uri
      );
      console.log('Minted gift card with ID:', tokenId);
      await loadGiftCards();
      setFormData({
        value: '',
        merchant: '',
        expirationDate: 30,
        uri: ''
      });
    } catch (err) {
      console.error('Error minting gift card:', err);
      setError('Failed to mint gift card');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">CardSphere Dashboard</h1>
      
      {/* Wallet Connection */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Wallet Connection</h2>
        {isConnected ? (
          <div>
            <p className="mb-2">Connected: {address}</p>
            <button 
              onClick={connect}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Reconnect
            </button>
          </div>
        ) : (
          <button 
            onClick={connect}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Connect Wallet
          </button>
        )}
      </div>
      
      {/* NFT Test Component */}
      {isConnected && <NFTTest />}
      
      {/* Mint Gift Card Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Mint New Gift Card</h2>
        <form onSubmit={handleMintGiftCard}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1">Value (ETH)</label>
              <input
                type="text"
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: e.target.value})}
                className="w-full border rounded p-2"
                placeholder="0.1"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Merchant</label>
              <input
                type="text"
                value={formData.merchant}
                onChange={(e) => setFormData({...formData, merchant: e.target.value})}
                className="w-full border rounded p-2"
                placeholder="Amazon"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Expiration (days)</label>
              <input
                type="number"
                value={formData.expirationDate}
                onChange={(e) => setFormData({...formData, expirationDate: parseInt(e.target.value)})}
                className="w-full border rounded p-2"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block mb-1">URI (optional)</label>
              <input
                type="text"
                value={formData.uri}
                onChange={(e) => setFormData({...formData, uri: e.target.value})}
                className="w-full border rounded p-2"
                placeholder="https://..."
              />
            </div>
          </div>
          <button 
            type="submit"
            disabled={loading || !isConnected}
            className={`px-4 py-2 rounded ${
              loading || !isConnected 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {loading ? 'Processing...' : 'Mint Gift Card'}
          </button>
        </form>
      </div>
      
      {/* Gift Cards List */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Your Gift Cards</h2>
        {loading ? (
          <p>Loading gift cards...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : giftCards.length === 0 ? (
          <p>You don't have any gift cards yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {giftCards.map((card) => (
              <div key={card.id} className="border rounded p-4">
                <h3 className="font-semibold">{card.merchant}</h3>
                <p>Value: {card.value} ETH</p>
                <p>Expires: {new Date(card.expirationDate * 1000).toLocaleDateString()}</p>
                <p>Status: {card.isExpired ? 'Expired' : 'Valid'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 