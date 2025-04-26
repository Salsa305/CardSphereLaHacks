from fastapi import FastAPI
import models
from app.routes.profile_routes import profile_router
from app.routes.vendor_routes import vendor_router
from app.routes.campaign_routes import campaign_router
from app.routes.giftcard_routes import giftcard_router
from app.routes.auth_routes import auth_router
from app.routes.security import security_router

app = FastAPI()

app.include_router(profile_router, prefix="/profile", tags=["Profile"])
app.include_router(vendor_router, prefix="/vendor", tags=["Vendor"])
app.include_router(campaign_router, prefix="/campaign", tags=["Campaign"])
app.include_router(giftcard_router, prefix="/giftcard", tags=["GiftCard"])
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(security_router, prefix="/security", tags=["Security"])


@app.get("/")
def read_root():
    return {"Hello": "World"}


