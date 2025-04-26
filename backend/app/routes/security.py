# Method	Endpoint	Purpose
# POST	/security/zkp-auth	Perform Zero Knowledge Proof login (future)
# POST	/wallet/encrypt	Encrypt private keys (local storage)


from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from database.user import user_name

# Method	Endpoint	Purpose
# POST	/auth/register	Register a new user account (email, password)
# POST	/auth/login	Login user and get JWT token
# POST	/auth/connect-wallet	Connect Ethereum wallet address

security_router = APIRouter()  # Renamed from 'router' to 'auth_router'

@security_router.post("/auth/register")
def register(email: str, name: str, user_name: list, password: str, isVendor: bool):
    return None


@security_router.post("/auth/login")
def login(username: str, password: str):
    return None