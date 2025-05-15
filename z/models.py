from sqlalchemy import Column, Integer, String, DateTime
from z.database import Base

class User(Base):
    __tablename__ = "M0003_USER"

    ID = Column(Integer, primary_key=True)
    SMTP_USER = Column(String(255), nullable=False)
    SMTP_PASSWORD = Column(String(255), nullable=False)
    DATE_DELETED = Column(DateTime, nullable=True)