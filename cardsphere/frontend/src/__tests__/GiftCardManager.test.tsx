import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ethers } from 'ethers';
import GiftCardManager from '../components/GiftCardManager';
import { WalletProvider } from '../contexts/WalletContext';

// Mock the ethers library
jest.mock('ethers', () => ({
  ...jest.requireActual('ethers'),
  formatEther: jest.fn((value) => value.toString()),
  parseEther: jest.fn((value) => value),
}));

// Mock the contract hook
jest.mock('../hooks/useGiftCardContract', () => ({
  __esModule: true,
  default: () => ({
    contract: {
      getUserGiftCards: jest.fn().mockResolvedValue([
        {
          id: '1',
          vendor: 'Test Vendor',
          value: ethers.parseEther('100'),
          expirationDate: Math.floor(Date.now() / 1000) + 86400,
          isOfficial: false,
          cardNumber: '1234567890',
          pin: '1234',
        },
      ]),
      addGiftCard: jest.fn().mockResolvedValue({
        wait: jest.fn().mockResolvedValue({
          events: [
            {
              event: 'GiftCardCreated',
              args: { id: '2' },
            },
          ],
        }),
      }),
      transferGiftCard: jest.fn().mockResolvedValue({
        wait: jest.fn().mockResolvedValue({
          events: [
            {
              event: 'GiftCardTransferred',
              args: { id: '1', from: '0x123', to: '0x456' },
            },
          ],
        }),
      }),
      convertToOfficial: jest.fn().mockResolvedValue({
        wait: jest.fn().mockResolvedValue({
          events: [
            {
              event: 'GiftCardConverted',
              args: { id: '1', isOfficial: true },
            },
          ],
        }),
      }),
    },
    error: null,
  }),
}));

describe('GiftCardManager', () => {
  const mockAddress = '0x1234567890123456789012345678901234567890';

  const renderComponent = () => {
    return render(
      <WalletProvider>
        <GiftCardManager />
      </WalletProvider>
    );
  };

  beforeEach(() => {
    // Mock window.ethereum
    window.ethereum = {
      request: jest.fn().mockResolvedValue([mockAddress]),
      on: jest.fn(),
      removeListener: jest.fn(),
    };
  });

  it('renders gift card manager', () => {
    renderComponent();
    expect(screen.getByText('Gift Card Manager')).toBeInTheDocument();
  });

  it('loads and displays existing gift cards', async () => {
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText('Test Vendor')).toBeInTheDocument();
      expect(screen.getByText('$100')).toBeInTheDocument();
    });
  });

  it('adds a new gift card', async () => {
    renderComponent();
    
    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('Vendor'), {
      target: { value: 'New Vendor' },
    });
    fireEvent.change(screen.getByPlaceholderText('Value'), {
      target: { value: '200' },
    });
    fireEvent.change(screen.getByPlaceholderText('Card Number (optional)'), {
      target: { value: '9876543210' },
    });
    fireEvent.change(screen.getByPlaceholderText('PIN (optional)'), {
      target: { value: '5678' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Add Gift Card'));

    await waitFor(() => {
      expect(screen.getByText('New Vendor')).toBeInTheDocument();
      expect(screen.getByText('$200')).toBeInTheDocument();
    });
  });

  it('transfers a gift card', async () => {
    renderComponent();
    
    // Open transfer form
    fireEvent.click(screen.getByText('Transfer'));
    
    // Enter recipient address
    fireEvent.change(screen.getByPlaceholderText('Enter recipient address'), {
      target: { value: '0x4567890123456789012345678901234567890123' },
    });
    
    // Submit transfer
    fireEvent.click(screen.getByText('Send Gift Card'));
    
    await waitFor(() => {
      expect(screen.queryByText('Send Gift Card')).not.toBeInTheDocument();
    });
  });

  it('converts a gift card to official', async () => {
    renderComponent();
    
    // Open card details
    fireEvent.click(screen.getByText('View Details'));
    
    // Convert to official
    fireEvent.click(screen.getByText('Convert to Official'));
    
    await waitFor(() => {
      expect(screen.getByText('Official')).toBeInTheDocument();
    });
  });

  it('shows error for invalid recipient address', async () => {
    renderComponent();
    
    // Open transfer form
    fireEvent.click(screen.getByText('Transfer'));
    
    // Enter invalid address
    fireEvent.change(screen.getByPlaceholderText('Enter recipient address'), {
      target: { value: 'invalid-address' },
    });
    
    // Submit transfer
    fireEvent.click(screen.getByText('Send Gift Card'));
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid Ethereum address')).toBeInTheDocument();
    });
  });
}); 