// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GiftCardMarketplace {
    struct GiftCard {
        uint256 id;
        string vendor;
        uint256 value;
        uint256 expirationDate;
        bool isOfficial;
        string cardNumber;
        string pin;
        address owner;
    }

    mapping(uint256 => GiftCard) public giftCards;
    mapping(address => uint256[]) public userGiftCards;
    uint256 private nextGiftCardId;

    event GiftCardCreated(uint256 indexed id, address indexed owner, string vendor, uint256 value);
    event GiftCardTransferred(uint256 indexed id, address indexed from, address indexed to);
    event GiftCardConverted(uint256 indexed id, bool isOfficial);

    function addGiftCard(
        string memory vendor,
        uint256 value,
        uint256 expirationDate,
        string memory cardNumber,
        string memory pin
    ) public returns (uint256) {
        require(value > 0, "Value must be greater than 0");
        require(expirationDate > block.timestamp, "Expiration date must be in the future");

        uint256 id = nextGiftCardId++;
        GiftCard memory newCard = GiftCard({
            id: id,
            vendor: vendor,
            value: value,
            expirationDate: expirationDate,
            isOfficial: false,
            cardNumber: cardNumber,
            pin: pin,
            owner: msg.sender
        });

        giftCards[id] = newCard;
        userGiftCards[msg.sender].push(id);

        emit GiftCardCreated(id, msg.sender, vendor, value);
        return id;
    }

    function transferGiftCard(uint256 cardId, address to) public returns (bool) {
        require(to != address(0), "Invalid recipient address");
        GiftCard storage card = giftCards[cardId];
        require(card.owner == msg.sender, "Not the owner of this gift card");
        require(!card.isOfficial, "Cannot transfer official gift cards");
        require(block.timestamp < card.expirationDate, "Gift card has expired");

        // Remove card from sender's list
        uint256[] storage senderCards = userGiftCards[msg.sender];
        for (uint256 i = 0; i < senderCards.length; i++) {
            if (senderCards[i] == cardId) {
                senderCards[i] = senderCards[senderCards.length - 1];
                senderCards.pop();
                break;
            }
        }

        // Add card to recipient's list
        userGiftCards[to].push(cardId);
        card.owner = to;

        emit GiftCardTransferred(cardId, msg.sender, to);
        return true;
    }

    function convertToOfficial(uint256 cardId) public returns (bool) {
        GiftCard storage card = giftCards[cardId];
        require(card.owner == msg.sender, "Not the owner of this gift card");
        require(!card.isOfficial, "Card is already official");
        require(block.timestamp < card.expirationDate, "Gift card has expired");

        card.isOfficial = true;
        emit GiftCardConverted(cardId, true);
        return true;
    }

    function getUserGiftCards(address user) public view returns (GiftCard[] memory) {
        uint256[] storage userCards = userGiftCards[user];
        GiftCard[] memory cards = new GiftCard[](userCards.length);
        
        for (uint256 i = 0; i < userCards.length; i++) {
            cards[i] = giftCards[userCards[i]];
        }
        
        return cards;
    }

    function getGiftCard(uint256 cardId) public view returns (GiftCard memory) {
        return giftCards[cardId];
    }
} 