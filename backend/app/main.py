from fastapi import FastAPI
from CardSphereLaHacks.backend.app.utils.database import engine
from app import models

models.Base.metadata.create_all(bind=engine)  # Creates tables if not exists

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}


