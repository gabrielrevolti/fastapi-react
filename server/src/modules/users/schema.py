from pydantic import BaseModel, EmailStr

class UserLogin(BaseModel):
    smtp_user: EmailStr
    smtp_password: str

class UserEmail(BaseModel):
    smtp_user: EmailStr