const hre = require("hardhat");

async function main() {
  const GiftCardMarketplace = await hre.ethers.getContractFactory("GiftCardMarketplace");
  const giftCard = await GiftCardMarketplace.deploy();
  await giftCard.deployed();
  console.log(`Deployed at: ${giftCard.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
