'use client';

import React from 'react';
import { giftCardService } from '../lib/giftCardService';
import { GiftCardClass } from './GiftCardClass';

interface GiftCardListState {
  ownerAddress: string;
  giftCards: any[];
  showCreateForm: boolean;
  amount: string;
  loading: boolean;
  error: string | null;
}

export class GiftCardListClass extends React.Component<{}, GiftCardListState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      ownerAddress: '',
      giftCards: [],
      showCreateForm: false,
      amount: '',
      loading: false,
      error: null
    };
    this.handleCreateGiftCard = this.handleCreateGiftCard.bind(this);
    this.handleTransfer = this.handleTransfer.bind(this);
    this.handleRedeem = this.handleRedeem.bind(this);
    this.toggleCreateForm = this.toggleCreateForm.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleOwnerAddressChange = this.handleOwnerAddressChange.bind(this);
  }

  componentDidMount() {
    this.loadGiftCards();
  }

  componentDidUpdate(prevProps: {}, prevState: GiftCardListState) {
    // If ownerAddress changes, reload gift cards
    if (this.state.ownerAddress !== prevState.ownerAddress) {
      this.loadGiftCards();
    }
  }

  async loadGiftCards() {
    if (!this.state.ownerAddress) return;
    
    this.setState({ loading: true, error: null });
    
    try {
      const giftCards = await giftCardService.getGiftCardsByOwner(this.state.ownerAddress);
      this.setState({ giftCards, loading: false });
    } catch (err) {
      this.setState({ 
        error: err instanceof Error ? err.message : 'Failed to fetch gift cards', 
        loading: false 
      });
    }
  }

  toggleCreateForm() {
    this.setState(prevState => ({ 
      showCreateForm: !prevState.showCreateForm 
    }));
  }

  handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ amount: e.target.value });
  }

  handleOwnerAddressChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ ownerAddress: e.target.value });
  }

  async handleCreateGiftCard(e: React.FormEvent) {
    e.preventDefault();
    if (!this.state.ownerAddress || !this.state.amount) return;
    
    this.setState({ loading: true, error: null });
    
    try {
      await giftCardService.createGiftCard(
        this.state.ownerAddress, 
        parseFloat(this.state.amount)
      );
      this.setState({ 
        amount: '', 
        showCreateForm: false,
        loading: false 
      });
      this.loadGiftCards();
    } catch (err) {
      this.setState({ 
        error: err instanceof Error ? err.message : 'Failed to create gift card', 
        loading: false 
      });
    }
  }

  async handleTransfer(id: string, to: string) {
    if (!this.state.ownerAddress) return;
    
    this.setState({ loading: true, error: null });
    
    try {
      await giftCardService.transferGiftCard(id, this.state.ownerAddress, to);
      this.setState({ loading: false });
      this.loadGiftCards();
    } catch (err) {
      this.setState({ 
        error: err instanceof Error ? err.message : 'Failed to transfer gift card', 
        loading: false 
      });
    }
  }

  async handleRedeem(id: string) {
    if (!this.state.ownerAddress) return;
    
    this.setState({ loading: true, error: null });
    
    try {
      await giftCardService.redeemGiftCard(id, this.state.ownerAddress);
      this.setState({ loading: false });
      this.loadGiftCards();
    } catch (err) {
      this.setState({ 
        error: err instanceof Error ? err.message : 'Failed to redeem gift card', 
        loading: false 
      });
    }
  }

  render() {
    const { ownerAddress, giftCards, showCreateForm, amount, loading, error } = this.state;

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Your Gift Cards</h2>
          <button
            onClick={this.toggleCreateForm}
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
          <form onSubmit={this.handleCreateGiftCard} className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Your Address
              </label>
              <input
                type="text"
                value={ownerAddress}
                onChange={this.handleOwnerAddressChange}
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
                onChange={this.handleAmountChange}
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
              <GiftCardClass
                key={card.id}
                {...card}
                onTransfer={() => this.loadGiftCards()}
                onRedeem={() => this.loadGiftCards()}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
} 