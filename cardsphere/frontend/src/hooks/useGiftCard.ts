import { useCustomState, useCustomCallback } from './useCustomState';
import { giftCardService } from '../lib/giftCardService';

export const useGiftCard = () => {
  const [loading, setLoading] = useCustomState<boolean>(false);
  const [error, setError] = useCustomState<string | null>(null);

  const createGiftCard = useCustomCallback(async (owner: string, amount: number) => {
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

  const getGiftCards = useCustomCallback(async (owner: string) => {
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

  const transferGiftCard = useCustomCallback(async (id: string, from: string, to: string) => {
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

  const redeemGiftCard = useCustomCallback(async (id: string, owner: string) => {
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