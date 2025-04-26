'use client';

import * as React from 'react';
import { useGiftCard } from '../hooks/useGiftCard';

interface GiftCardProps {
  id: string;
  amount: number;
  owner: string;
  createdAt: Date;
  onTransfer?: () => void;
  onRedeem?: () => void;
}

export const GiftCard: React.FC<GiftCardProps> = ({
  id,
  amount,
  owner,
  createdAt,
  onTransfer,
  onRedeem
}) => {
  const [showTransferForm, setShowTransferForm] = React.useState(false);
  const [recipientAddress, setRecipientAddress] = React.useState('');
  const { transferGiftCard, redeemGiftCard, loading, error } = useGiftCard();

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await transferGiftCard(id, owner, recipientAddress);
    if (result) {
      setShowTransferForm(false);
      setRecipientAddress('');
      onTransfer?.();
    }
  };

  const handleRedeem = async () => {
    const result = await redeemGiftCard(id, owner);
    if (result) {
      onRedeem?.();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Gift Card #{id.slice(0, 8)}</h3>
          <p className="text-gray-600 text-sm">
            Created: {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">${amount.toFixed(2)}</p>
          <p className="text-gray-500 text-sm">Owner: {owner.slice(0, 6)}...{owner.slice(-4)}</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {showTransferForm ? (
        <form onSubmit={handleTransfer} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Recipient Address
            </label>
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter recipient's Ethereum address"
              required
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              disabled={loading}
            >
              {loading ? 'Transferring...' : 'Transfer Gift Card'}
            </button>
            <button
              type="button"
              onClick={() => setShowTransferForm(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex space-x-2">
          <button
            onClick={() => setShowTransferForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Transfer
          </button>
          <button
            onClick={handleRedeem}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            disabled={loading}
          >
            {loading ? 'Redeeming...' : 'Redeem'}
          </button>
        </div>
      )}
    </div>
  );
}; 