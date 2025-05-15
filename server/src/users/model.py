from pydantic import BaseModel, EmailStr

class UserOut(BaseModel):
    id: int
    name: str
    email: EmailStr
    smtp_user: str
