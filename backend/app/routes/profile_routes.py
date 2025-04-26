# Method	Endpoint	Purpose
# GET	/transactions	View user's past purchases, redemptions, gifts


from fastapi import APIRouter, HTTPException
from app.data.giftcards import gift_cards
from fastapi.responses import JSONResponse
from schemas.user import user_name


# Method	Endpoint	Purpose
# POST	/redeem	Redeem a gift card via QR or NFC scan

router = APIRouter()

@router.post("/redeem")
def get_giftcards(email: str):
    for card in gift_cards:
        if card["email"] == email:
            return JSONResponse(status_code=200, content={"message": "Gift cards retrieved successfully", "gift_cards": card})
    raise HTTPException(status_code=404, detail="No gift cards found for this email")


    
