from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str

class UserResponse(UserCreate):
    id: int

    class Config:
        orm_mode = True

user_name = {
    {
        "id": 1,
        "name": "John Doe",
        "password": "password123",
        "isVendor": False
    },
    {
        "id": 2,
        "name": "Jane Smith",
        "password": "password456",
        "isVendor": True
    },
    {
        "id": 3,
        "name": "Alice Johnson",
        "password": "password789",
        "isVendor": False
    },
    {
        "id": 4,
        "name": "Bob Brown",
        "password": "password101112",
        "isVendor": True
    },
    {
        "id": 5,
        "name": "Charlie Davis",
        "password": "password131415",
        "isVendor": False
    }
}

