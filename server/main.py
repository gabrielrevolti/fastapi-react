from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2AuthorizationCodeBearer, OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext
from models import User
from database import AsyncSession, engine
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

oaut2_schema = OAuth2PasswordBearer(tokenUrl="token")

origins = [
  "http://localhost:3000"
]

app.add_middleware(
  CORSMiddleware
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

def get_db():
  db = AsyncSession()
  try:
    yield db
  finally:
    db.close()

# pwd_context = CryptContext(schemas=["bcrypt"], deprecated="auto")

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
