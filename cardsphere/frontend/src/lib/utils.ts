import { ethers } from 'ethers';

/**
 * Validates if a string is a valid Ethereum address
 * @param address The address to validate
 * @returns true if valid, false otherwise
 */
export const isValidEthereumAddress = (address: string): boolean => {
  try {
    // Check if the address is a valid checksum address
    return ethers.isAddress(address);
  } catch (error) {
    return false;
  }
};

/**
 * Formats an Ethereum address for display (truncates middle)
 * @param address The address to format
 * @returns Formatted address string
 */
export const formatAddress = (address: string): string => {
  if (!address) return '';
  if (address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}; 