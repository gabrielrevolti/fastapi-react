from typing import Annotated
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from ..database.core import DbSession
from src.auth import service, model

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/token", response_model=model.Token)
def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: DbSession):
    return service.login_for_access_token(form_data, db)

@router.get("/verify-token/{token}")
def verify_user_token(token: str):
    service.verify_token(token)
    return {"message": "Token is valid"}
