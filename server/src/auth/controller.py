from typing import Annotated
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from ..database.core import DbSession

from . import service, models
from src.database.core import get_db

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/token", response_model=models.Token)
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: DbSession):
    return await service.login_for_access_token(form_data, db)

@router.get("/verify-token/{token}")
async def verify_user_token(token: str):
    service.verify_token(token)
    return {"message": "Token is valid"}
