import { ethers } from 'ethers';
import MarketplaceABI from '../deployments/GiftCardMarketplace.json';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

export const getContract = (providerOrSigner: ethers.providers.Provider | ethers.Signer) => {
  return new ethers.Contract(CONTRACT_ADDRESS, MarketplaceABI, providerOrSigner);
};
