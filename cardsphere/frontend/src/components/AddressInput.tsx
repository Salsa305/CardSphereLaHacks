'use client';

import * as React from 'react';
import { isValidEthereumAddress, formatAddress } from '../lib/utils';

interface AddressInputProps {
  onAddressChange: (address: string, isValid: boolean) => void;
  placeholder?: string;
  label?: string;
  initialValue?: string;
}

export default function AddressInput({
  onAddressChange,
  placeholder = 'Enter Ethereum address',
  label = 'Wallet Address',
  initialValue = ''
}: AddressInputProps) {
  const [address, setAddress] = React.useState(initialValue);
  const [isValid, setIsValid] = React.useState(false);
  const [touched, setTouched] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const [showTooltip, setShowTooltip] = React.useState(false);

  React.useEffect(() => {
    // Validate on initial value change
    if (initialValue) {
      const valid = isValidEthereumAddress(initialValue);
      setIsValid(valid);
      onAddressChange(initialValue, valid);
    }
  }, [initialValue, onAddressChange]);

  const getErrorMessage = (addr: string): string => {
    if (!addr) return 'Please enter an Ethereum address';
    if (!addr.startsWith('0x')) return 'Address must start with "0x"';
    if (addr.length !== 42) return 'Address must be 42 characters long (including "0x")';
    if (!/^0x[a-fA-F0-9]{40}$/.test(addr)) return 'Address must contain only hexadecimal characters';
    return 'Please enter a valid Ethereum address';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    
    // Only validate if the field has been touched
    if (touched) {
      const valid = isValidEthereumAddress(newAddress);
      setIsValid(valid);
      setErrorMessage(valid ? '' : getErrorMessage(newAddress));
      onAddressChange(newAddress, valid);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    const valid = isValidEthereumAddress(address);
    setIsValid(valid);
    setErrorMessage(valid ? '' : getErrorMessage(address));
    onAddressChange(address, valid);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          value={address}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors duration-200 ${
            touched
              ? isValid
                ? 'border-green-500 focus:ring-green-200 bg-green-50'
                : 'border-red-500 focus:ring-red-200 bg-red-50'
              : 'border-gray-300 focus:ring-blue-200'
          }`}
        />
        {touched && address && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isValid ? (
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <div className="relative">
                <svg
                  className="w-5 h-5 text-red-500 cursor-help"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                {showTooltip && (
                  <div className="absolute right-0 mt-2 w-64 p-2 bg-gray-800 text-white text-sm rounded-md shadow-lg z-10">
                    <p>Example of a valid address:</p>
                    <code className="block mt-1 text-xs">0x742d35Cc6634C0532925a3b844Bc454e4438f44e</code>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {touched && address && !isValid && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600 font-medium">
            {errorMessage}
          </p>
          <p className="mt-1 text-xs text-red-500">
            Make sure your address:
            <ul className="list-disc list-inside ml-2 mt-1">
              <li>Starts with "0x"</li>
              <li>Is 42 characters long</li>
              <li>Contains only hexadecimal characters (0-9 and a-f)</li>
            </ul>
          </p>
        </div>
      )}
      {touched && address && isValid && (
        <p className="mt-2 text-sm text-green-600 font-medium">
          Valid address: {formatAddress(address)}
        </p>
      )}
    </div>
  );
} 