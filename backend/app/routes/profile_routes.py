# Method	Endpoint	Purpose
# GET	/transactions	View user's past purchases, redemptions, gifts

from fastapi import APIRouter, HTTPException
from database.giftcards import gift_cards
from fastapi.responses import JSONResponse
from database.user import user_name

# Method	Endpoint	Purpose
# POST	/redeem	Redeem a gift card via QR or NFC scan

profile_router = APIRouter()  # Renamed from 'router' to 'profile_router'

@profile_router.post("/redeem")
def get_giftcards(email: str):
    for card in gift_cards:
        if card["email"] == email:
            return JSONResponse(
                status_code=200,
                content={
                    "message": "Gift cards retrieved successfully",
                    "gift_cards": card,
                    "giftCardOwned": [],
                },
            )
    raise HTTPException(status_code=404, detail="No gift cards found for this email")



