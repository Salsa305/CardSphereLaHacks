import { giftCardService } from '../lib/giftCardService';

// A class-based implementation that doesn't rely on React hooks
class GiftCardManager {
  private loading: boolean = false;
  private error: string | null = null;
  private listeners: (() => void)[] = [];

  // Subscribe to state changes
  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify all listeners of state changes
  private notify() {
    this.listeners.forEach(listener => listener());
  }

  // Get current state
  getState() {
    return {
      loading: this.loading,
      error: this.error
    };
  }

  // Create a new gift card
  async createGiftCard(owner: string, amount: number) {
    this.loading = true;
    this.error = null;
    this.notify();

    try {
      const giftCard = await giftCardService.createGiftCard(owner, amount);
      this.loading = false;
      this.notify();
      return giftCard;
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to create gift card';
      this.loading = false;
      this.notify();
      return null;
    }
  }

  // Get all gift cards for an address
  async getGiftCards(owner: string) {
    this.loading = true;
    this.error = null;
    this.notify();

    try {
      const giftCards = giftCardService.getGiftCardsByOwner(owner);
      this.loading = false;
      this.notify();
      return giftCards;
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to fetch gift cards';
      this.loading = false;
      this.notify();
      return [];
    }
  }

  // Transfer a gift card to another address
  async transferGiftCard(id: string, from: string, to: string) {
    this.loading = true;
    this.error = null;
    this.notify();

    try {
      const giftCard = await giftCardService.transferGiftCard(id, from, to);
      this.loading = false;
      this.notify();
      return giftCard;
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to transfer gift card';
      this.loading = false;
      this.notify();
      return null;
    }
  }

  // Redeem a gift card
  async redeemGiftCard(id: string, owner: string) {
    this.loading = true;
    this.error = null;
    this.notify();

    try {
      const giftCard = await giftCardService.redeemGiftCard(id, owner);
      this.loading = false;
      this.notify();
      return giftCard;
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Failed to redeem gift card';
      this.loading = false;
      this.notify();
      return null;
    }
  }
}

// Create a singleton instance
const giftCardManager = new GiftCardManager();

// Export a function that returns the manager instance
export function useGiftCardClass() {
  return {
    ...giftCardManager.getState(),
    createGiftCard: giftCardManager.createGiftCard.bind(giftCardManager),
    getGiftCards: giftCardManager.getGiftCards.bind(giftCardManager),
    transferGiftCard: giftCardManager.transferGiftCard.bind(giftCardManager),
    redeemGiftCard: giftCardManager.redeemGiftCard.bind(giftCardManager)
  };
} 