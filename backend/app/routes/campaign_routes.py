from fastapi import APIRouter, HTTPException
from app.data.giftcards import gift_cards
from fastapi.responses import JSONResponse
from schemas.user import user_name


# /auth/register, /auth/login, /auth/connect-wallet


router = APIRouter()

# @router.get("/profile")
# def register(email: str, name: str, user_name: list, password: str, isVendor: bool):
#     user = {
#         "id": len(user_name) + 1,
#         "name": name,
#         "password": password,
#         "isVendor": isVendor,
#         "email": email,
#         "giftCardOwned": [],
#     }
#     user_name.append(user)
#     return JSONResponse(status_code=200, content={"message": "User registered successfully", "user": user})


# @router.post("/profile")
# def login(username: str, password: str):
#     for user in user_name:
#         if user["name"] == username and user["password"] == password:
#             return JSONResponse(status_code=200, content={"message": "Login successful", "user": user})
#     raise HTTPException(status_code=401, detail="Invalid username or password")
