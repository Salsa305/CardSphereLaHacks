# Method	Endpoint	Purpose
# POST	/vendor/auth/register	Vendor registers business account
# POST	/vendor/auth/login	Vendor logs in
# GET	/vendor/profile	View vendor profile
# PUT	/vendor/profile	Update business info
# POST	/vendor/giftcards	Vendor creates a new gift card
# PUT	/vendor/giftcards/{card_id}	Vendor updates gift card info
# DELETE	/vendor/giftcards/{card_id}	Vendor deletes a gift card
# POST	/vendor/campaigns	Vendor creates a promotional campaign
# GET	/vendor/analytics	Vendor views stats (sales, redemptions)
# GET	/vendors/	Browse all vendors
# GET	/vendors/search	Search/filter vendors
# GET	/vendors/{vendor_id}	View vendor's page (their gift cards and promotions)
# POST	/vendors/{vendor_id}/buy-card	Buy a gift card from a vendor
# POST	/vendors/{vendor_id}/claim-coupon	Claim vendor's coupon

from fastapi import APIRouter, HTTPException
from database.giftcards import gift_cards
from fastapi.responses import JSONResponse
from database.user import user_name
from database.campaigns import campaigns

vendor_router = APIRouter()  # Renamed from 'router' to 'vendor_router'

@vendor_router.post("/vendor/auth/register")
def register_vendor(email: str, password: str, business_name: str):
    return {"message": "Vendor registered successfully"}

@vendor_router.post("/vendor/auth/login")
def register_vendor(email: str, password: str, business_name: str):
    for user in user_name:
        if user["email"] == email and user["password"] == password:
            return JSONResponse(status_code=200, content={"message": "Vendor logged in successfully", "vendor": user})
    raise HTTPException(status_code=401, detail="Invalid email or password")

@vendor_router.get("/vendor/profile")
def get_vendor_profile(email: str):
    for user in user_name:
        if user["email"] == email:
            return JSONResponse(status_code=200, content={"message": "Vendor profile retrieved successfully", "vendor": user})
    raise HTTPException(status_code=404, detail="Vendor not found")

@vendor_router.put("/vendor/profile")
def update_vendor_profile(email: str, business_name: str, new_password: str):
    for user in user_name:
        if user["email"] == email:
            user["business_name"] = business_name
            user["password"] = new_password
            return JSONResponse(status_code=200, content={"message": "Vendor profile updated successfully", "vendor": user})
    raise HTTPException(status_code=404, detail="Vendor not found")

@vendor_router.post("/vendor/giftcards")
def create_giftcard(email: str, card_code: str, balance: float, active: bool):
    for user in user_name:
        if user["email"] == email:
            new_card = {
                "card_code": card_code,
                "balance": balance,
                "active": active
            }
            user["gift_cards"].append(new_card)
            return JSONResponse(status_code=201, content={"message": "Gift card created successfully", "gift_card": new_card})
    raise HTTPException(status_code=404, detail="Vendor not found")

@vendor_router.put("/vendor/giftcards/{card_id}")
def update_giftcard(card_id: int, email: str, balance: float, active: bool):
    for user in user_name:
        if user["email"] == email:
            for card in user["gift_cards"]:
                if card["card_code"] == card_id:
                    card["balance"] = balance
                    card["active"] = active
                    return JSONResponse(status_code=200, content={"message": "Gift card updated successfully", "gift_card": card})
    raise HTTPException(status_code=404, detail="Gift card not found")

@vendor_router.delete("/vendor/giftcards/{card_id}")
def delete_giftcard(card_id: int, email: str):
    for user in user_name:
        if user["email"] == email:
            for card in user["gift_cards"]:
                if card["card_code"] == card_id:
                    user["gift_cards"].remove(card)
                    return JSONResponse(status_code=200, content={"message": "Gift card deleted successfully"})
    raise HTTPException(status_code=404, detail="Gift card not found")

@vendor_router.post("/vendor/campaigns")
def create_campaign(email: str, campaign_name: str, discount: float):
    for user in user_name:
        if user["email"] == email:
            new_campaign = {
                "campaign_name": campaign_name,
                "discount": discount
            }
            user["campaigns"].append(new_campaign)
            return JSONResponse(status_code=201, content={"message": "Campaign created successfully", "campaign": new_campaign})
    raise HTTPException(status_code=404, detail="Vendor not found")

# "MNO": {
#         "vendor": "MNO",
#         "campaign_name": "MNO Campaign",
#         "discount_percent": 40,
#         "campaign_code": "MNO123",
#         "description": "40% off on all products",
#         "card _code": "MNO123"
#     }


# DELETE	/vendor/giftcards/{card_id}	Vendor deletes a gift card
# POST	/vendor/campaigns	Vendor creates a promotional campaign
# GET	/vendor/analytics	Vendor views stats (sales, redemptions)
# GET	/vendors/	Browse all vendors
# GET	/vendors/search	Search/filter vendors
# GET	/vendors/{vendor_id}	View vendor's page (their gift cards and promotions)
# POST	/vendors/{vendor_id}/buy-card	Buy a gift card from a vendor
# POST	/vendors/{vendor_id}/claim-coupon	Claim vendor's coupon
