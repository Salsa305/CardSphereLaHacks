import { useState, useCallback } from 'react';
import { getAddressTransactions, getNFTMetadata, getTokenBalance } from '../lib/alchemy';

export const useAlchemy = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async (address: string) => {
    setLoading(true);
    setError(null);
    try {
      const transactions = await getAddressTransactions(address);
      return transactions;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transactions');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchNFTMetadata = useCallback(async (contractAddress: string, tokenId: string) => {
    setLoading(true);
    setError(null);
    try {
      const metadata = await getNFTMetadata(contractAddress, tokenId);
      return metadata;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch NFT metadata');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTokenBalance = useCallback(async (address: string, contractAddress: string) => {
    setLoading(true);
    setError(null);
    try {
      const balance = await getTokenBalance(address, contractAddress);
      return balance;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch token balance');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    fetchTransactions,
    fetchNFTMetadata,
    fetchTokenBalance
  };
}; 