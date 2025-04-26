import { alchemy } from './alchemy';

// Simple in-memory store for gift cards
// In production, replace this with a real database
const giftCardStore = new Map<string, {
  id: string;
  amount: number;
  owner: string;
  createdAt: Date;
}>();

export const giftCardService = {
  // Create a new gift card
  createGiftCard: async (owner: string, amount: number) => {
    const id = Math.random().toString(36).substring(2, 15);
    const giftCard = {
      id,
      amount,
      owner,
      createdAt: new Date()
    };
    giftCardStore.set(id, giftCard);
    return giftCard;
  },

  // Get a gift card by ID
  getGiftCard: (id: string) => {
    return giftCardStore.get(id);
  },

  // Get all gift cards for an address
  getGiftCardsByOwner: (owner: string) => {
    return Array.from(giftCardStore.values())
      .filter(card => card.owner.toLowerCase() === owner.toLowerCase());
  },

  // Transfer a gift card to another address
  transferGiftCard: async (id: string, from: string, to: string) => {
    const card = giftCardStore.get(id);
    if (!card) throw new Error('Gift card not found');
    if (card.owner.toLowerCase() !== from.toLowerCase()) {
      throw new Error('Not authorized to transfer this gift card');
    }

    // Update the card owner
    card.owner = to;
    giftCardStore.set(id, card);
    return card;
  },

  // Redeem a gift card
  redeemGiftCard: async (id: string, owner: string) => {
    const card = giftCardStore.get(id);
    if (!card) throw new Error('Gift card not found');
    if (card.owner.toLowerCase() !== owner.toLowerCase()) {
      throw new Error('Not authorized to redeem this gift card');
    }

    // Remove the card from the store
    giftCardStore.delete(id);
    return card;
  }
}; 