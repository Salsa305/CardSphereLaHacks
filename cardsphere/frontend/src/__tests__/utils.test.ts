import { isValidEthereumAddress, formatAddress } from '../lib/utils';

describe('Ethereum Address Utilities', () => {
  describe('isValidEthereumAddress', () => {
    test('validates correct Ethereum addresses', () => {
      const validAddresses = [
        '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // Vitalik's address
        '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
        '0x123f681646d4a755815f9cb19e1acc8565a0c2ac'
      ];

      validAddresses.forEach(address => {
        expect(isValidEthereumAddress(address)).toBe(true);
      });
    });

    test('rejects invalid Ethereum addresses', () => {
      const invalidAddresses = [
        '',                    // empty string
        '0x',                  // too short
        '0x123',              // too short
        'not an address',     // invalid format
        '0x123456789012345678901234567890123456789', // wrong length
        '0xG23456789012345678901234567890123456789', // invalid character
        null,                 // null
        undefined,            // undefined
      ];

      invalidAddresses.forEach(address => {
        expect(isValidEthereumAddress(address as string)).toBe(false);
      });
    });
  });

  describe('formatAddress', () => {
    test('formats addresses correctly', () => {
      const testCases = [
        {
          input: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
          expected: '0x742d...f44e'
        },
        {
          input: '0x123',
          expected: '0x123'  // short addresses are returned as is
        },
        {
          input: '',
          expected: ''
        }
      ];

      testCases.forEach(({ input, expected }) => {
        expect(formatAddress(input)).toBe(expected);
      });
    });
  });
}); 