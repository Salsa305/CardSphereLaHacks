from fastapi import APIRouter, HTTPException
from app.data.giftcards import gift_cards
from fastapi.responses import JSONResponse
from schemas.user import user_name
from datetime import datetime

# Method	Endpoint	Purpose
# GET	/giftcards/	List all user's gift cards
# POST	/giftcards/	Add a new gift card manually
# POST	/giftcards/scan	Scan QR or NFC to import a gift card
# GET	/giftcards/{card_id}	View details of a specific card (vendor, value, expiration)
# DELETE	/giftcards/{card_id}	Delete a card (optional)
# POST	/giftcards/{card_id}/transfer	Send/gift a card to another user


router = APIRouter()

@router.get("/giftcards")
def get_cards_owned(email: str):
    for user in user_name:
        if user["email"] == email:
            return JSONResponse(status_code=200, content={"message": "Gift cards retrieved successfully", "gift_cards": card["giftCardOwned"]})
    raise HTTPException(status_code=404, detail="No gift cards found for this email")

@router.post("/giftcards")
def add_card(card_code: str, balance: float, active: bool, email: str):
    for user in user_name:
        if user["email"] == email:
            new_card = {
                "card_code": card_code,
                "balance": balance,
                "active": active
            }
            user["giftCardOwned"].append(new_card)
            return JSONResponse(status_code=200, content={"message": "Gift card added successfully", "gift_cards": user["giftCardOwned"]})
    raise HTTPException(status_code=404, detail="No gift cards found for this email")

@router.get("/giftcards/{card_id}")
def get_giftcard(card_id: int):
    for card in gift_cards:
        if card == card_id:
            return JSONResponse(status_code=200, content={"message": "Gift card retrieved successfully", "gift_card": card})
    raise HTTPException(status_code=404, detail="Gift card not found")

@router.post("/giftcaards/{card_id}/transfer")
def transfer_giftcard(card_id: int, email_sender: str, recipient_email: str):
    card = None
    user_send = None
    for card_ in gift_cards:
        if card_ == card_id:
            card = card_
            break

    if card is None:
        raise HTTPException(status_code=404, detail="Gift card not found")
    for user in user_name:
        if user["email"] == email_sender:
            user_send = user
            user["giftCardOwned"].remove(card)
            user["history"].append({"card": card, "action": "transferred","time": datetime.now()})
            break
    for user in user_name:
        if user["email"] == recipient_email:
            user["giftCardOwned"].append(card)
            user["history"].append({"card": card, "action": "received","vendor":user,"time": datetime.now()})
            return JSONResponse(status_code=200, content={"message": "Gift card transferred successfully", "gift_card": card})
    raise HTTPException(status_code=404, detail="Recipient not found")
            


    