import * as React from 'react';
import { giftCardService } from '../lib/giftCardService';

export const useGiftCard = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const createGiftCard = React.useCallback(async (owner: string, amount: number) => {
    setLoading(true);
    setError(null);
    try {
      const giftCard = await giftCardService.createGiftCard(owner, amount);
      return giftCard;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create gift card');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getGiftCards = React.useCallback(async (owner: string) => {
    setLoading(true);
    setError(null);
    try {
      const giftCards = giftCardService.getGiftCardsByOwner(owner);
      return giftCards;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch gift cards');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const transferGiftCard = React.useCallback(async (id: string, from: string, to: string) => {
    setLoading(true);
    setError(null);
    try {
      const giftCard = await giftCardService.transferGiftCard(id, from, to);
      return giftCard;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to transfer gift card');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const redeemGiftCard = React.useCallback(async (id: string, owner: string) => {
    setLoading(true);
    setError(null);
    try {
      const giftCard = await giftCardService.redeemGiftCard(id, owner);
      return giftCard;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to redeem gift card');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createGiftCard,
    getGiftCards,
    transferGiftCard,
    redeemGiftCard
  };
}; 