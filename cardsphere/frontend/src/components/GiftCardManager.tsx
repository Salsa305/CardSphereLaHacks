'use client';

import * as React from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../contexts/WalletContext';
import { useGiftCardContract } from '../hooks/useGiftCardContract';
import AddressInput from './AddressInput';

interface GiftCard {
  id: string;
  vendor: string;
  value: string;
  expirationDate: Date;
  isOfficial: boolean;
  cardNumber?: string;
  pin?: string;
}

interface ScannedData {
  vendor: string;
  value: string;
  expirationDate: Date;
  cardNumber: string;
  pin: string;
}

export default function GiftCardManager() {
  const { address } = useWallet();
  const { contract } = useGiftCardContract();
  const [giftCards, setGiftCards] = React.useState<GiftCard[]>([]);
  const [newGiftCard, setNewGiftCard] = React.useState<Partial<GiftCard>>({});
  const [scanning, setScanning] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState<GiftCard | null>(null);
  const [recipientAddress, setRecipientAddress] = React.useState('');
  const [showTransferForm, setShowTransferForm] = React.useState(false);
  const [transferError, setTransferError] = React.useState<string | null>(null);

  const loadGiftCards = React.useCallback(async () => {
    if (!contract || !address) return;
    try {
      const cards = await contract.getUserGiftCards(address);
      setGiftCards(cards.map((card: any) => ({
        id: card.id.toString(),
        vendor: card.vendor,
        value: ethers.formatEther(card.value),
        expirationDate: new Date(card.expirationDate * 1000),
        isOfficial: card.isOfficial,
        cardNumber: card.cardNumber,
        pin: card.pin
      })));
    } catch (error) {
      console.error('Error loading gift cards:', error);
    }
  }, [contract, address]);

  React.useEffect(() => {
    if (address && contract) {
      loadGiftCards();
    }
  }, [address, contract, loadGiftCards]);

  const handleAddGiftCard = React.useCallback(async () => {
    if (!contract || !address || !newGiftCard.vendor || !newGiftCard.value) return;
    try {
      const tx = await contract.addGiftCard(
        newGiftCard.vendor,
        ethers.parseEther(newGiftCard.value),
        Math.floor(new Date(newGiftCard.expirationDate!).getTime() / 1000),
        newGiftCard.cardNumber || '',
        newGiftCard.pin || ''
      );
      await tx.wait();
      await loadGiftCards();
      setNewGiftCard({});
    } catch (error) {
      console.error('Error adding gift card:', error);
    }
  }, [contract, address, newGiftCard, loadGiftCards]);

  const handleScanCard = React.useCallback(async () => {
    setScanning(true);
    try {
      // Here we would integrate with a barcode/QR scanner
      // For now, we'll simulate scanning
      const scannedData = await new Promise<ScannedData>(resolve => 
        setTimeout(() => resolve({
          vendor: 'Sample Vendor',
          value: '100',
          expirationDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          cardNumber: '1234567890',
          pin: '1234'
        }), 1000)
      );
      setNewGiftCard(scannedData);
    } catch (error) {
      console.error('Error scanning card:', error);
    } finally {
      setScanning(false);
    }
  }, []);

  const handleConvertToOfficial = React.useCallback(async (card: GiftCard) => {
    if (!contract || !address) return;
    try {
      const tx = await contract.convertToOfficial(card.id);
      await tx.wait();
      await loadGiftCards();
    } catch (error) {
      console.error('Error converting to official card:', error);
    }
  }, [contract, address, loadGiftCards]);

  const handleTransfer = React.useCallback(async (card: GiftCard) => {
    if (!contract || !address || !recipientAddress) return;
    try {
      setTransferError(null);
      const tx = await contract.transferGiftCard(card.id, recipientAddress);
      await tx.wait();
      await loadGiftCards();
      setShowTransferForm(false);
      setRecipientAddress('');
    } catch (error) {
      console.error('Error transferring gift card:', error);
      setTransferError('Failed to transfer gift card. Please check the recipient address and try again.');
    }
  }, [contract, address, recipientAddress, loadGiftCards]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Gift Card Manager</h2>
      
      {/* Add New Gift Card Form */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Add New Gift Card</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Vendor"
            className="border rounded p-2"
            value={newGiftCard.vendor || ''}
            onChange={e => setNewGiftCard({...newGiftCard, vendor: e.target.value})}
          />
          <input
            type="number"
            placeholder="Value"
            className="border rounded p-2"
            value={newGiftCard.value || ''}
            onChange={e => setNewGiftCard({...newGiftCard, value: e.target.value})}
          />
          <input
            type="date"
            className="border rounded p-2"
            value={newGiftCard.expirationDate ? new Date(newGiftCard.expirationDate).toISOString().split('T')[0] : ''}
            onChange={e => setNewGiftCard({...newGiftCard, expirationDate: new Date(e.target.value)})}
          />
          <input
            type="text"
            placeholder="Card Number (optional)"
            className="border rounded p-2"
            value={newGiftCard.cardNumber || ''}
            onChange={e => setNewGiftCard({...newGiftCard, cardNumber: e.target.value})}
          />
          <input
            type="text"
            placeholder="PIN (optional)"
            className="border rounded p-2"
            value={newGiftCard.pin || ''}
            onChange={e => setNewGiftCard({...newGiftCard, pin: e.target.value})}
          />
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleAddGiftCard}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Gift Card
          </button>
          <button
            onClick={handleScanCard}
            disabled={scanning}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            {scanning ? 'Scanning...' : 'Scan Card'}
          </button>
        </div>
      </div>

      {/* Gift Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {giftCards.map(card => (
          <div
            key={card.id}
            className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold">{card.vendor}</h3>
            <p className="text-gray-600">Value: ${card.value}</p>
            <p className="text-gray-600">
              Expires: {card.expirationDate.toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              Status: {card.isOfficial ? 'Official' : 'Digital'}
            </p>
            {card.cardNumber && (
              <p className="text-gray-600">Card #: {card.cardNumber}</p>
            )}
            <div className="mt-4 flex gap-2">
              {!card.isOfficial && (
                <button
                  onClick={() => handleConvertToOfficial(card)}
                  className="bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600"
                >
                  Convert to Official
                </button>
              )}
              <button
                onClick={() => {
                  setSelectedCard(card);
                  setShowTransferForm(true);
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
              >
                Transfer
              </button>
              <button
                onClick={() => setSelectedCard(card)}
                className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Card Details Modal */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">{selectedCard.vendor} Gift Card</h3>
            <div className="space-y-2">
              <p><strong>Value:</strong> ${selectedCard.value}</p>
              <p><strong>Expiration:</strong> {selectedCard.expirationDate.toLocaleDateString()}</p>
              <p><strong>Status:</strong> {selectedCard.isOfficial ? 'Official' : 'Digital'}</p>
              {selectedCard.cardNumber && (
                <p><strong>Card Number:</strong> {selectedCard.cardNumber}</p>
              )}
              {selectedCard.pin && (
                <p><strong>PIN:</strong> {selectedCard.pin}</p>
              )}
            </div>

            {showTransferForm && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Transfer Gift Card</h4>
                <AddressInput
                  onAddressChange={(address, isValid) => {
                    setRecipientAddress(address);
                    setTransferError(isValid ? null : 'Please enter a valid Ethereum address');
                  }}
                  placeholder="Enter recipient address"
                />
                {transferError && (
                  <p className="text-red-500 text-sm mt-2">{transferError}</p>
                )}
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleTransfer(selectedCard)}
                    disabled={!recipientAddress}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                  >
                    Send Gift Card
                  </button>
                  <button
                    onClick={() => setShowTransferForm(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {!showTransferForm && (
              <button
                onClick={() => setSelectedCard(null)}
                className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Close
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 