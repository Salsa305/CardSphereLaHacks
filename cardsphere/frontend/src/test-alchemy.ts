const { getAddressTransactions, alchemy } = require('./lib/alchemy');

async function testAlchemyAPI() {
  try {
    const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
    console.log('Testing with address:', address);
    
    // Test getting transactions
    console.log('\nFetching transactions...');
    const transfers = await getAddressTransactions(address);
    console.log('Recent transfers:', transfers.transfers.length);
    
    // Test getting token balances
    console.log('\nFetching token balances...');
    const balances = await alchemy.core.getTokenBalances(address);
    console.log('Token balances:', balances.tokenBalances.length);
    
    console.log('\nAlchemy API test completed successfully!');
  } catch (error) {
    console.error('Error testing Alchemy API:', error);
  }
}

// Run the test
testAlchemyAPI(); 