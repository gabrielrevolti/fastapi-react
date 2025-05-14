# src/auth/service.py
import os
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from sqlalchemy import select, and_
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from src.entities.user import User
from src.database.core import get_db
from . import models

SECRET_KEY = os.getenv("SECRET_KEY", "unsafe_dev_key")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")

async def authenticate_user(username: str, password: str, db: AsyncSession) -> User | None:
    stmt = select(User).where(
        and_(
            User.SMTP_USER == username,
            User.SMTP_PASSWORD == password,
            User.DATE_DELETED.is_(None)
        )
    )
    result = await db.execute(stmt)
    return result.scalar_one_or_none()

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str) -> models.TokenData:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=403, detail="Token is invalid or expired")
        return models.TokenData(username=username)
    except JWTError:
        raise HTTPException(status_code=403, detail="Token is invalid or expired")

async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm, db: AsyncSession
) -> models.Token:
    user = await authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(
        data={"sub": user.SMTP_USER},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return models.Token(access_token=access_token, token_type="bearer")
