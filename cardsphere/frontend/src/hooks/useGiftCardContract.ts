import * as React from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../contexts/WalletContext';

// ABI for the GiftCard contract
const GIFT_CARD_ABI = [
  "function getUserGiftCards(address user) view returns (tuple(uint256 id, string vendor, uint256 value, uint256 expirationDate, bool isOfficial, string cardNumber, string pin)[])",
  "function addGiftCard(string vendor, uint256 value, uint256 expirationDate, string cardNumber, string pin) returns (uint256)",
  "function convertToOfficial(uint256 cardId) returns (bool)",
  "function convertGiftCard(uint256 fromCardId, uint256 toCardId) returns (bool)"
];

const CONTRACT_ADDRESS = process.env.REACT_APP_GIFT_CARD_CONTRACT_ADDRESS || '';

export function useGiftCardContract() {
  const { address } = useWallet();
  const [contract, setContract] = React.useState<ethers.Contract | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (typeof window.ethereum !== 'undefined' && address) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const getContract = async () => {
        const signer = await provider.getSigner();
        const giftCardContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          GIFT_CARD_ABI,
          signer
        );
        setContract(giftCardContract);
      };
      getContract();
    }
  }, [address]);

  return { contract, error };
} 