'use client';

import * as React from 'react';
import { giftCardService } from '../lib/giftCardService';

interface GiftCardProps {
  id: string;
  amount: number;
  owner: string;
  createdAt: Date;
  onTransfer?: () => void;
  onRedeem?: () => void;
}

interface GiftCardState {
  showTransferForm: boolean;
  recipientAddress: string;
  loading: boolean;
  error: string | null;
}

export class GiftCardClass extends React.Component<GiftCardProps, GiftCardState> {
  constructor(props: GiftCardProps) {
    super(props);
    this.state = {
      showTransferForm: false,
      recipientAddress: '',
      loading: false,
      error: null
    };
    this.handleTransfer = this.handleTransfer.bind(this);
    this.handleRedeem = this.handleRedeem.bind(this);
  }

  async handleTransfer(e: React.FormEvent) {
    e.preventDefault();
    this.setState({ loading: true, error: null });
    
    try {
      await giftCardService.transferGiftCard(
        this.props.id,
        this.props.owner,
        this.state.recipientAddress
      );
      this.setState({ 
        showTransferForm: false,
        recipientAddress: '',
        loading: false
      });
      this.props.onTransfer?.();
    } catch (err) {
      this.setState({ 
        error: err instanceof Error ? err.message : 'Failed to transfer gift card',
        loading: false
      });
    }
  }

  async handleRedeem() {
    this.setState({ loading: true, error: null });
    
    try {
      await giftCardService.redeemGiftCard(this.props.id, this.props.owner);
      this.setState({ loading: false });
      this.props.onRedeem?.();
    } catch (err) {
      this.setState({ 
        error: err instanceof Error ? err.message : 'Failed to redeem gift card',
        loading: false
      });
    }
  }

  render() {
    const { id, amount, owner, createdAt } = this.props;
    const { showTransferForm, recipientAddress, loading, error } = this.state;

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
          <form onSubmit={this.handleTransfer} className="mt-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Recipient Address
              </label>
              <input
                type="text"
                value={recipientAddress}
                onChange={(e) => this.setState({ recipientAddress: e.target.value })}
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
                onClick={() => this.setState({ showTransferForm: false })}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={() => this.setState({ showTransferForm: true })}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              disabled={loading}
            >
              Transfer
            </button>
            <button
              onClick={this.handleRedeem}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              disabled={loading}
            >
              Redeem
            </button>
          </div>
        )}
      </div>
    );
  }
} 