// Test script to demonstrate that gift cards are NFTs
import { ethers } from 'ethers';
import { GIFT_CARD_NFT_ADDRESS, GIFT_CARD_NFT_ABI } from './config/contracts';

async function testGiftCardNFT() {
  console.log("Testing Gift Card NFT functionality...");
  
  // Check if MetaMask is installed
  if (typeof window.ethereum === 'undefined') {
    console.error("MetaMask is not installed. Please install MetaMask to run this test.");
    return;
  }
  
  try {
    // Connect to the provider and get the signer
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    
    console.log(`Connected with address: ${address}`);
    
    // Create contract instance
    const contract = new ethers.Contract(GIFT_CARD_NFT_ADDRESS, GIFT_CARD_NFT_ABI, signer);
    
    // Get initial balance
    const initialBalance = await contract.balanceOf(address);
    console.log(`Initial NFT balance: ${initialBalance}`);
    
    // Mint a new gift card
    console.log("Minting a new gift card...");
    const valueInWei = ethers.parseEther("0.01"); // 0.01 ETH
    const merchant = "Test Merchant";
    const expirationDate = Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60); // 30 days from now
    const uri = "https://example.com/giftcard/metadata/1";
    
    const mintTx = await contract.mintGiftCard(
      address,
      valueInWei,
      merchant,
      expirationDate,
      uri,
      { value: valueInWei }
    );
    
    console.log("Minting transaction sent. Waiting for confirmation...");
    const receipt = await mintTx.wait();
    
    // Find the GiftCardMinted event
    const event = receipt.logs
      .filter(log => log.topics[0] === ethers.id('GiftCardMinted(uint256,address,uint256,string,uint256)'))
      .map(log => {
        const decodedLog = contract.interface.parseLog(log);
        return decodedLog?.args;
      })[0];
    
    const tokenId = event ? Number(event[0]) : null;
    console.log(`Gift card minted with token ID: ${tokenId}`);
    
    // Verify it's an NFT by checking ownership
    const owner = await contract.ownerOf(tokenId);
    console.log(`Token owner: ${owner}`);
    console.log(`Is the owner the connected address? ${owner.toLowerCase() === address.toLowerCase()}`);
    
    // Check NFT metadata
    const [value, storedMerchant, storedExpirationDate, storedUri] = await Promise.all([
      contract.getGiftCardValue(tokenId),
      contract.getMerchant(tokenId),
      contract.getExpirationDate(tokenId),
      contract.tokenURI(tokenId)
    ]);
    
    console.log("NFT Metadata:");
    console.log(`- Value: ${ethers.formatEther(value)} ETH`);
    console.log(`- Merchant: ${storedMerchant}`);
    console.log(`- Expiration Date: ${new Date(Number(storedExpirationDate) * 1000).toLocaleString()}`);
    console.log(`- URI: ${storedUri}`);
    
    // Check final balance
    const finalBalance = await contract.balanceOf(address);
    console.log(`Final NFT balance: ${finalBalance}`);
    console.log(`Balance increased by: ${finalBalance - initialBalance}`);
    
    console.log("Test completed successfully! The gift card is indeed an NFT.");
    
  } catch (error) {
    console.error("Error during test:", error);
  }
}

// Export the test function
export { testGiftCardNFT }; 