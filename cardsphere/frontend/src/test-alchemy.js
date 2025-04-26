const { Alchemy, Network } = require('alchemy-sdk');

async function testAlchemyAPI() {
  try {
    const settings = {
      apiKey: "2orw15ReJ6lW8HFNecjO4_5VHEfvOPId",
      network: Network.ETH_SEPOLIA,
    };

    const alchemy = new Alchemy(settings);
    
    // Test getting the latest block number
    console.log('\nFetching latest block number...');
    const blockNumber = await alchemy.core.getBlockNumber();
    console.log('Latest block:', blockNumber);

    // Test getting balance for an address
    const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
    console.log('\nFetching balance for address:', address);
    const balance = await alchemy.core.getBalance(address);
    console.log('Balance in Wei:', balance.toString());
    
    // Test getting token balances
    console.log('\nFetching token balances...');
    const tokenBalances = await alchemy.core.getTokenBalances(address);
    console.log('Number of tokens:', tokenBalances.tokenBalances.length);
    
    console.log('\nAlchemy API test completed successfully!');
  } catch (error) {
    console.error('Error testing Alchemy API:', error);
  }
}

// Run the test
testAlchemyAPI(); 