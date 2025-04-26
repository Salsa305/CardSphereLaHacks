from fastapi import APIRouter, HTTPException
from database.giftcards import gift_cards
from fastapi.responses import JSONResponse
from database.user import user_name


# Method	Endpoint	Purpose
# GET	/profile	Get user profile
# PUT	/profile	Update name, contact info, etc.

campaign_router = APIRouter()  # Renamed from 'router' to 'campaign_router'

@campaign_router.get("/profile")
def get_profile(email: str):
    for user in user_name:
        if user["email"] == email:
            return JSONResponse(status_code=200, content={"message": "User profile retrieved successfully", "user": user})
    raise HTTPException(status_code=404, detail="User not found")


@campaign_router.put("/profile")
def update_profile(name: str, email: str, password: str):
    for user in user_name:
        if user["email"] == email:
            user["name"] = name
            user["password"] = password
            return JSONResponse(status_code=200, content={"message": "User profile updated successfully", "user": user})
    raise HTTPException(status_code=404, detail="User not found")

