const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GiftCardMarketplace", function () {
  let GiftCardMarketplace;
  let giftCardMarketplace;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    GiftCardMarketplace = await ethers.getContractFactory("GiftCardMarketplace");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Deploy a new GiftCardMarketplace contract before each test
    giftCardMarketplace = await GiftCardMarketplace.deploy();
    await giftCardMarketplace.deployed();
  });

  describe("Gift Card Creation", function () {
    it("Should create a new gift card", async function () {
      const vendor = "Test Vendor";
      const value = ethers.utils.parseEther("100");
      const expirationDate = Math.floor(Date.now() / 1000) + 86400; // 24 hours from now
      const cardNumber = "1234567890";
      const pin = "1234";

      await expect(giftCardMarketplace.addGiftCard(
        vendor,
        value,
        expirationDate,
        cardNumber,
        pin
      ))
        .to.emit(giftCardMarketplace, "GiftCardCreated")
        .withArgs(0, owner.address, vendor, value);

      const card = await giftCardMarketplace.getGiftCard(0);
      expect(card.vendor).to.equal(vendor);
      expect(card.value).to.equal(value);
      expect(card.expirationDate).to.equal(expirationDate);
      expect(card.cardNumber).to.equal(cardNumber);
      expect(card.pin).to.equal(pin);
      expect(card.owner).to.equal(owner.address);
      expect(card.isOfficial).to.equal(false);
    });

    it("Should not create a gift card with zero value", async function () {
      await expect(
        giftCardMarketplace.addGiftCard(
          "Test Vendor",
          0,
          Math.floor(Date.now() / 1000) + 86400,
          "1234567890",
          "1234"
        )
      ).to.be.revertedWith("Value must be greater than 0");
    });

    it("Should not create a gift card with past expiration date", async function () {
      await expect(
        giftCardMarketplace.addGiftCard(
          "Test Vendor",
          ethers.utils.parseEther("100"),
          Math.floor(Date.now() / 1000) - 86400,
          "1234567890",
          "1234"
        )
      ).to.be.revertedWith("Expiration date must be in the future");
    });
  });

  describe("Gift Card Transfer", function () {
    let cardId;

    beforeEach(async function () {
      // Create a gift card before each test
      const tx = await giftCardMarketplace.addGiftCard(
        "Test Vendor",
        ethers.utils.parseEther("100"),
        Math.floor(Date.now() / 1000) + 86400,
        "1234567890",
        "1234"
      );
      const receipt = await tx.wait();
      const event = receipt.events.find(e => e.event === "GiftCardCreated");
      cardId = event.args.id;
    });

    it("Should transfer a gift card to another address", async function () {
      await expect(giftCardMarketplace.transferGiftCard(cardId, addr1.address))
        .to.emit(giftCardMarketplace, "GiftCardTransferred")
        .withArgs(cardId, owner.address, addr1.address);

      const card = await giftCardMarketplace.getGiftCard(cardId);
      expect(card.owner).to.equal(addr1.address);
    });

    it("Should not transfer a gift card to zero address", async function () {
      await expect(
        giftCardMarketplace.transferGiftCard(cardId, ethers.constants.AddressZero)
      ).to.be.revertedWith("Invalid recipient address");
    });

    it("Should not transfer a gift card if not the owner", async function () {
      await expect(
        giftCardMarketplace.connect(addr1).transferGiftCard(cardId, addr2.address)
      ).to.be.revertedWith("Not the owner of this gift card");
    });

    it("Should not transfer an official gift card", async function () {
      await giftCardMarketplace.convertToOfficial(cardId);
      await expect(
        giftCardMarketplace.transferGiftCard(cardId, addr1.address)
      ).to.be.revertedWith("Cannot transfer official gift cards");
    });
  });

  describe("Gift Card Conversion", function () {
    let cardId;

    beforeEach(async function () {
      // Create a gift card before each test
      const tx = await giftCardMarketplace.addGiftCard(
        "Test Vendor",
        ethers.utils.parseEther("100"),
        Math.floor(Date.now() / 1000) + 86400,
        "1234567890",
        "1234"
      );
      const receipt = await tx.wait();
      const event = receipt.events.find(e => e.event === "GiftCardCreated");
      cardId = event.args.id;
    });

    it("Should convert a gift card to official", async function () {
      await expect(giftCardMarketplace.convertToOfficial(cardId))
        .to.emit(giftCardMarketplace, "GiftCardConverted")
        .withArgs(cardId, true);

      const card = await giftCardMarketplace.getGiftCard(cardId);
      expect(card.isOfficial).to.equal(true);
    });

    it("Should not convert a gift card if not the owner", async function () {
      await expect(
        giftCardMarketplace.connect(addr1).convertToOfficial(cardId)
      ).to.be.revertedWith("Not the owner of this gift card");
    });

    it("Should not convert an already official gift card", async function () {
      await giftCardMarketplace.convertToOfficial(cardId);
      await expect(
        giftCardMarketplace.convertToOfficial(cardId)
      ).to.be.revertedWith("Card is already official");
    });
  });

  describe("Gift Card Listing", function () {
    it("Should list all gift cards for a user", async function () {
      // Create multiple gift cards
      for (let i = 0; i < 3; i++) {
        await giftCardMarketplace.addGiftCard(
          `Vendor ${i}`,
          ethers.utils.parseEther("100"),
          Math.floor(Date.now() / 1000) + 86400,
          `card${i}`,
          `pin${i}`
        );
      }

      const cards = await giftCardMarketplace.getUserGiftCards(owner.address);
      expect(cards.length).to.equal(3);
      expect(cards[0].vendor).to.equal("Vendor 0");
      expect(cards[1].vendor).to.equal("Vendor 1");
      expect(cards[2].vendor).to.equal("Vendor 2");
    });

    it("Should return empty array for user with no gift cards", async function () {
      const cards = await giftCardMarketplace.getUserGiftCards(addr1.address);
      expect(cards.length).to.equal(0);
    });
  });
}); 