from typing import Annotated
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from src.database.core import DbConnection
from src.modules.auth import service
from src.modules.auth import schema as schema_auth

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/token", response_model=schema_auth.Token)
def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: DbConnection):
    return service.login_for_access_token(form_data, db)

@router.get("/verify-token/{token}")
def verify_user_token(token: str):
    service.verify_token(token)
    return {"message": "Token is valid"}