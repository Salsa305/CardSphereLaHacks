'use client';

import * as React from 'react';
import { ethers } from 'ethers';

interface WalletContextType {
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnected: boolean;
  error: string | null;
}

const WalletContext = React.createContext<WalletContextType>({
  address: null,
  connect: async () => {},
  disconnect: () => {},
  isConnected: false,
  error: null,
});

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = React.useState<string | null>(null);
  const [isConnected, setIsConnected] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setAddress(accounts[0]);
            setIsConnected(true);
          }
        } catch (err) {
          console.error('Error checking wallet connection:', err);
          setError('Failed to check wallet connection');
        }
      }
    };

    checkConnection();

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length > 0) {
        setAddress(accounts[0]);
        setIsConnected(true);
        setError(null);
      } else {
        setAddress(null);
        setIsConnected(false);
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const connect = async () => {
    setError(null);
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAddress(accounts[0]);
        setIsConnected(true);
      } catch (err) {
        console.error('Error connecting to MetaMask:', err);
        setError('Failed to connect to wallet. Please make sure MetaMask is installed and try again.');
      }
    } else {
      setError('Please install MetaMask to use this application');
    }
  };

  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
    setError(null);
  };

  return (
    <WalletContext.Provider value={{ address, connect, disconnect, isConnected, error }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return React.useContext(WalletContext);
} 