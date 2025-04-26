'use client';

import * as React from 'react';
import { ethers } from 'ethers';

interface WalletContextType {
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnected: boolean;
}

const WalletContext = React.createContext<WalletContextType>({
  address: null,
  connect: async () => {},
  disconnect: () => {},
  isConnected: false,
});

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = React.useState<string | null>(null);
  const [isConnected, setIsConnected] = React.useState(false);

  React.useEffect(() => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
      // Check if already connected
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAddress(accounts[0]);
            setIsConnected(true);
          }
        })
        .catch(console.error);

      // Listen for account changes
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          setIsConnected(true);
        } else {
          setAddress(null);
          setIsConnected(false);
        }
      });
    }
  }, []);

  const connect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAddress(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      alert('Please install MetaMask to use this application');
    }
  };

  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
  };

  return (
    <WalletContext.Provider value={{ address, connect, disconnect, isConnected }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return React.useContext(WalletContext);
} 