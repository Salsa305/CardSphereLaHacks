from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str

class UserResponse(UserCreate):
    id: int

    class Config:
        orm_mode = True

user_name = [
    {
        "id": 1,
        "name": "John Doe",
        "password": "password123",
        "isVendor": False,
        "email": "JohnDoe@gmail.com",
        "giftCardOwned": [
            {
                "card_code": "ABC123",
                "balance": 100.0,
                "active": True
            },
            {
                "card_code": "XYZ789",
                "balance": 50.0,
                "active": True
            }
        ],
        "history": [],
        "user_balance": 0.0,
    },
    {
        "id": 2,
        "name": "Jane Smith",
        "password": "password456",
        "isVendor": True,
        "giftCrdOwned": [
            {
                "card_code": "LMN456",
                "balance": 25.0,
                "active": False
            },
            {
                "card_code": "DEF012",
                "balance": 75.0,
                "active": True
            }
        ],
        "history": [],
        "user_balance": 0.0,
    },
    {
        "id": 3,
        "name": "Alice Johnson",
        "password": "password789",
        "isVendor": False,
        "giftCardOwned": [
            {
                "card_code": "GHI345",
                "balance": 200.0,
                "active": True
            },
            {
                "card_code": "JKL678",
                "balance": 150.0,
                "active": False
            }
        ],
        "history": [],
        "user_balance": 0.0,
    },
    {
        "id": 4,
        "name": "Bob Brown",
        "password": "password101112",
        "isVendor": True,
        "giftCardOwned": [
            {
                "card_code": "MNO901",
                "balance": 300.0,
                "active": True
            },
            {
                "card_code": "PQR234",
                "balance": 10.0,
                "active": True
            }
        ],
        "history": [],
        "user_balance": 0.0,
    },
    {
        "id": 5,
        "name": "Charlie Davis",
        "password": "password131415",
        "isVendor": False,
        "giftCardOwned": [
            {
                "card_code": "STU567",
                "balance": 0.0,
                "active": False
            },
            {
                "card_code": "VWX890",
                "balance": 500.0,
                "active": True
            }
        ],
        "history": [],
        "user_balance": 0.0,
    }
]

