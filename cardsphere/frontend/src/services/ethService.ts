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
      console.log('Fetching ETH price from Chainlink...');
      const [price, decimals] = await Promise.all([
        this.usdPriceFeed.latestAnswer(),
        this.usdPriceFeed.decimals()
      ]);
      const formattedPrice = Number(price) / Math.pow(10, Number(decimals));
      console.log(`ETH price: $${formattedPrice}`);
      return formattedPrice;
    } catch (error) {
      console.error('Error fetching ETH price:', error);
      // Fallback to a default price if the price feed fails
      console.log('Using fallback ETH price: $2000');
      return 2000; // Fallback price
    }
  }

  async usdToEth(usdAmount: number): Promise<string> {
    try {
      console.log(`Converting $${usdAmount} to ETH...`);
      const ethPrice = await this.getEthPrice();
      const ethAmount = usdAmount / ethPrice;
      const weiAmount = ethers.parseEther(ethAmount.toFixed(18)).toString();
      console.log(`$${usdAmount} = ${ethAmount} ETH = ${weiAmount} wei`);
      return weiAmount;
    } catch (error) {
      console.error('Error converting USD to ETH:', error);
      throw new Error(`Failed to convert $${usdAmount} to ETH: ${error}`);
    }
  }

  async ethToUsd(ethAmount: string): Promise<number> {
    try {
      console.log(`Converting ${ethAmount} wei to USD...`);
      const ethPrice = await this.getEthPrice();
      const ethValue = Number(ethers.formatEther(ethAmount));
      const usdValue = ethValue * ethPrice;
      console.log(`${ethValue} ETH = $${usdValue}`);
      return usdValue;
    } catch (error) {
      console.error('Error converting ETH to USD:', error);
      throw new Error(`Failed to convert ${ethAmount} wei to USD: ${error}`);
    }
  }
} 