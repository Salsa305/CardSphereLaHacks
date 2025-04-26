import { ethers } from 'ethers';

// ABI for a simple price feed contract (using Chainlink as an example)
const PRICE_FEED_ABI = [
  "function latestAnswer() external view returns (int256)",
  "function decimals() external view returns (uint8)"
];

export class EthService {
  private provider: ethers.JsonRpcProvider;
  private usdPriceFeed: ethers.Contract;

  constructor() {
    // Using Sepolia testnet
    this.provider = new ethers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/2orw15ReJ6lW8HFNecjO4_5VHEfvOPId');
    // ETH/USD price feed on Sepolia testnet
    this.usdPriceFeed = new ethers.Contract(
      '0x694AA1769357215DE4FAC081bf1f309aDC325306', // ETH/USD Chainlink Price Feed on Sepolia
      PRICE_FEED_ABI,
      this.provider
    );
  }

  async getEthPrice(): Promise<number> {
    try {
      const [price, decimals] = await Promise.all([
        this.usdPriceFeed.latestAnswer(),
        this.usdPriceFeed.decimals()
      ]);
      return Number(price) / Math.pow(10, Number(decimals));
    } catch (error) {
      console.error('Error fetching ETH price:', error);
      throw error;
    }
  }

  async usdToEth(usdAmount: number): Promise<string> {
    const ethPrice = await this.getEthPrice();
    const ethAmount = usdAmount / ethPrice;
    return ethers.parseEther(ethAmount.toFixed(18)).toString();
  }

  async ethToUsd(ethAmount: string): Promise<number> {
    const ethPrice = await this.getEthPrice();
    const ethValue = Number(ethers.formatEther(ethAmount));
    return ethValue * ethPrice;
  }
} 