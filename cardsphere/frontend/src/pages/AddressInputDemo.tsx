import React, { useState } from 'react';
import AddressInput from '../components/AddressInput';

export default function AddressInputDemo() {
  const [address, setAddress] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleAddressChange = (newAddress: string, valid: boolean) => {
    setAddress(newAddress);
    setIsValid(valid);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Address Input Demo</h1>
          <p className="mt-2 text-sm text-gray-600">
            Test the enhanced address input validation
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <AddressInput
            onAddressChange={handleAddressChange}
            label="Recipient Address"
            placeholder="Enter recipient's Ethereum address"
          />

          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <h2 className="text-sm font-medium text-gray-700">Current State:</h2>
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                Address: <span className="font-mono">{address || 'Not entered'}</span>
              </p>
              <p className="text-sm text-gray-600">
                Status:{' '}
                <span className={isValid ? 'text-green-600' : 'text-red-600'}>
                  {isValid ? 'Valid' : 'Invalid'}
                </span>
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-medium text-gray-700 mb-2">Test Cases:</h2>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Valid address: 0x742d35Cc6634C0532925a3b844Bc454e4438f44e</li>
              <li>• Invalid: Missing 0x prefix</li>
              <li>• Invalid: Too short (0x123)</li>
              <li>• Invalid: Contains invalid characters</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 