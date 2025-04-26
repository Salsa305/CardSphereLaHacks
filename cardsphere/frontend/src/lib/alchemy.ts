import { Network, Alchemy, AssetTransfersCategory, SortingOrder } from 'alchemy-sdk';

// Initialize Alchemy with your API key
const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "2orw15ReJ6lW8HFNecjO4_5VHEfvOPId",
  network: Network.ETH_SEPOLIA, // Using Sepolia for development
};

export const alchemy = new Alchemy(settings);

// Get all transactions for an address
export const getAddressTransactions = async (address: string) => {
  try {
    const transfers = await alchemy.core.getAssetTransfers({
      fromAddress: address,
      category: [
        AssetTransfersCategory.EXTERNAL,
        AssetTransfersCategory.ERC20,
        AssetTransfersCategory.ERC721,
        AssetTransfersCategory.ERC1155
      ],
      maxCount: 100,
      order: SortingOrder.DESCENDING
    });
    return transfers;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

// Get NFT metadata
export const getNFTMetadata = async (contractAddress: string, tokenId: string) => {
  try {
    const metadata = await alchemy.nft.getNftMetadata(contractAddress, tokenId);
    return metadata;
  } catch (error) {
    console.error("Error fetching NFT metadata:", error);
    throw error;
  }
};

// Get token balances
export const getTokenBalances = async (address: string) => {
  try {
    const balances = await alchemy.core.getTokenBalances(address);
    return balances;
  } catch (error) {
    console.error("Error fetching token balances:", error);
    throw error;
  }
}; 