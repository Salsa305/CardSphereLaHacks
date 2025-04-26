'use client';

import React, { useState, useEffect } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { EthService } from '../services/ethService';
import { ethers } from 'ethers';

const ethService = new EthService();
const SEPOLIA_CHAIN_ID = '0xaa36a7'; // Sepolia testnet chain ID

export function GiftCardSender() {
  const { address, isConnected } = useWallet();
  const [recipientAddress, setRecipientAddress] = useState('');
  const [usdAmount, setUsdAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSepolia, setIsSepolia] = useState(false);
  const [ethAmount, setEthAmount] = useState<string | null>(null);

  useEffect(() => {
    const checkNetwork = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          setIsSepolia(chainId === SEPOLIA_CHAIN_ID);
        } catch (err) {
          console.error('Error checking network:', err);
        }
      }
    };

    checkNetwork();

    // Listen for network changes
    if (typeof window.ethereum !== 'undefined') {
      const ethereum = window.ethereum;
      ethereum.on('chainChanged', (chainId: string) => {
        setIsSepolia(chainId === SEPOLIA_CHAIN_ID);
      });
    }
  }, []);

  // Calculate ETH amount when USD amount changes
  useEffect(() => {
    const calculateEthAmount = async () => {
      if (usdAmount && !isNaN(Number(usdAmount)) && Number(usdAmount) > 0) {
        try {
          const ethValue = await ethService.usdToEth(Number(usdAmount));
          setEthAmount(ethValue);
        } catch (err) {
          console.error('Error calculating ETH amount:', err);
          setEthAmount(null);
        }
      } else {
        setEthAmount(null);
      }
    };

    calculateEthAmount();
  }, [usdAmount]);

  const switchToSepolia = async () => {
    if (typeof window.ethereum === 'undefined') {
      setError('MetaMask is not installed');
      return;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      });
    } catch (err: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: SEPOLIA_CHAIN_ID,
              chainName: 'Sepolia Test Network',
              nativeCurrency: {
                name: 'Sepolia ETH',
                symbol: 'ETH',
                decimals: 18
              },
              rpcUrls: ['https://eth-sepolia.g.alchemy.com/v2/2orw15ReJ6lW8HFNecjO4_5VHEfvOPId'],
              blockExplorerUrls: ['https://sepolia.etherscan.io']
            }]
          });
        } catch (addError) {
          console.error('Error adding Sepolia network:', addError);
        }
      } else {
        console.error('Error switching to Sepolia:', err);
      }
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !address) {
      setError('Please connect your wallet first');
      return;
    }

    if (typeof window.ethereum === 'undefined') {
      setError('MetaMask is not installed');
      return;
    }

    if (!isSepolia) {
      setError('Please switch to Sepolia testnet');
      return;
    }

    if (!ethAmount) {
      setError('Failed to calculate ETH amount. Please try again.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Sending transaction with params:', {
        to: recipientAddress,
        value: ethAmount,
        from: address
      });
      
      // Create the transaction
      const transaction = {
        to: recipientAddress,
        value: ethAmount,
        from: address
      };

      // Send the transaction using MetaMask
      const tx = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transaction],
      });

      console.log('Transaction sent:', tx);
      // Clear form
      setRecipientAddress('');
      setUsdAmount('');
      setEthAmount(null);
    } catch (err: any) {
      console.error('Error sending gift card:', err);
      let errorMessage = 'Failed to send gift card. Please try again.';
      
      if (err.code === 4001) {
        errorMessage = 'Transaction rejected by user.';
      } else if (err.code === -32603) {
        errorMessage = 'Insufficient funds for transaction.';
      } else if (err.message) {
        errorMessage = `Error: ${err.message}`;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Send Gift Card</h2>
      {!isSepolia && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-yellow-800 text-sm">
            Please switch to Sepolia testnet to send gift cards.
            <button
              onClick={switchToSepolia}
              className="ml-2 text-blue-600 hover:text-blue-800 underline"
            >
              Switch Network
            </button>
          </p>
        </div>
      )}
      <form onSubmit={handleSend} className="space-y-4">
        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">
            Recipient Address
          </label>
          <input
            type="text"
            id="recipient"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="0x..."
            required
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount (USD)
          </label>
          <input
            type="number"
            id="amount"
            value={usdAmount}
            onChange={(e) => setUsdAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
          {ethAmount && (
            <p className="mt-1 text-sm text-gray-500">
              This will send approximately {ethers.formatEther(ethAmount)} ETH
            </p>
          )}
        </div>
        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}
        <button
          type="submit"
          disabled={loading || !isConnected || !isSepolia || !ethAmount}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            ${loading || !isConnected || !isSepolia || !ethAmount
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
        >
          {loading ? 'Sending...' : 'Send Gift Card'}
        </button>
      </form>
    </div>
  );
} 