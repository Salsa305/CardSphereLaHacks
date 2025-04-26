from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from database.user import user_name

# Method	Endpoint	Purpose
# POST	/auth/register	Register a new user account (email, password)
# POST	/auth/login	Login user and get JWT token
# POST	/auth/connect-wallet	Connect Ethereum wallet address

auth_router = APIRouter()  # Renamed from 'router' to 'auth_router'

@auth_router.post("/auth/register")
def register(email: str, name: str, user_name: list, password: str, isVendor: bool):
    user = {
        "id": len(user_name) + 1,
        "name": name,
        "password": password,
        "isVendor": isVendor,
        "email": email,
        "giftCardOwned": [],
        "history": [],
    }
    user_name.append(user)
    return JSONResponse(status_code=200, content={"message": "User registered successfully", "user": user})


@auth_router.post("/auth/login")
def login(username: str, password: str):
    for user in user_name:
        if user["name"] == username and user["password"] == password:
            return JSONResponse(status_code=200, content={"message": "Login successful", "user": user})
    raise HTTPException(status_code=401, detail="Invalid username or password")
