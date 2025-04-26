from fastapi import APIRouter, HTTPException
from app.data.giftcards import gift_cards
from fastapi.responses import JSONResponse
from schemas.user import user_name


# /auth/register, /auth/login, /auth/connect-wallet


router = APIRouter()

@router.get("/giftcards")
def get_giftcards(email: str):
    for card in gift_cards:
        if card["email"] == email:
            return JSONResponse(status_code=200, content={"message": "Gift cards retrieved successfully", "gift_cards": card})
    raise HTTPException(status_code=404, detail="No gift cards found for this email")

@router.post("/giftcards")
def put_giftcards(email: str, card_code: str, balance: float, active: bool):
    for card in gift_cards:
        if card["email"] == email:
            new_card = {
                "card_code": card_code,
                "balance": balance,
                "active": active
            }
            card["giftCardOwned"].append(new_card)
            return JSONResponse(status_code=200, content={"message": "Gift card added successfully", "gift_cards": card})
    raise HTTPException(status_code=404, detail="No gift cards found for this email")

@router.post("/giftcards/scan")
def put_giftcards(email: str, card_code: str, balance: float, active: bool):
    pass
    