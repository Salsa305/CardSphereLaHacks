'use client';

import { useCustomState, useCustomCallback, useCustomEffect } from '../hooks/useCustomState';
import { useGiftCard } from '../hooks/useGiftCard';
import { GiftCard } from './GiftCard';

export const GiftCardList = () => {
  const { getGiftCards, createGiftCard, loading, error } = useGiftCard();
  const [giftCards, setGiftCards] = useCustomState<any[]>([]);
  const [showCreateForm, setShowCreateForm] = useCustomState<boolean>(false);
  const [amount, setAmount] = useCustomState<string>('');
  const [ownerAddress, setOwnerAddress] = useCustomState<string>('');

  const loadGiftCards = useCustomCallback(async () => {
    if (!ownerAddress) return;
    const cards = await getGiftCards(ownerAddress);
    setGiftCards(cards);
  }, [ownerAddress, getGiftCards]);

  useCustomEffect(() => {
    loadGiftCards();
  }, [loadGiftCards]);

  const handleCreateGiftCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerAddress || !amount) return;
    
    const card = await createGiftCard(ownerAddress, parseFloat(amount));
    if (card) {
      setAmount('');
      loadGiftCards();
    }
  };

  const handleTransfer = () => {
    // Implementation for transfer
  };

  const handleRedeem = () => {
    // Implementation for redeem
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Gift Cards</h2>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          {showCreateForm ? 'Cancel' : 'Create Gift Card'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showCreateForm && (
        <form onSubmit={handleCreateGiftCard} className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Your Address
            </label>
            <input
              type="text"
              value={ownerAddress}
              onChange={(e) => setOwnerAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your address"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Gift Card Amount ($)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
              min="1"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Gift Card'}
          </button>
        </form>
      )}

      {loading && giftCards.length === 0 ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading gift cards...</p>
        </div>
      ) : giftCards.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">You don't have any gift cards yet.</p>
          <p className="text-gray-500 text-sm mt-2">Create one to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {giftCards.map((card) => (
            <GiftCard
              key={card.id}
              {...card}
              onTransfer={handleTransfer}
              onRedeem={handleRedeem}
            />
          ))}
        </div>
      )}
    </div>
  );
}; 