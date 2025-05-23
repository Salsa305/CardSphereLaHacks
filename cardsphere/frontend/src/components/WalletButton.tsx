'use client';

import React from 'react';
import { useWallet } from '../contexts/WalletContext';

export function WalletButton() {
  const { address, connect, isConnected, error } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {error && (
        <div className="text-sm text-red-500 mb-2">
          {error}
        </div>
      )}
      {isConnected && address ? (
        <div className="text-sm font-medium">
          Connected: {formatAddress(address)}
        </div>
      ) : (
        <button
          onClick={connect}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
