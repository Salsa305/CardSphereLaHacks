'use client';

import React from 'react';
import { WalletButton } from '../components/WalletButton';
import { GiftCardSender } from '../components/GiftCardSender';
import { WalletProvider } from '../contexts/WalletContext';

export default function Home() {
  return (
    <WalletProvider>
      <main className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">CardSphere</h1>
            <WalletButton />
          </div>
          <GiftCardSender />
        </div>
      </main>
    </WalletProvider>
  );
}
