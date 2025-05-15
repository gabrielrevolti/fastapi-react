from sqlalchemy import select, and_
from sqlalchemy.orm import Session
from src.entities.user import User

def get_login_user(username: str, password: str, db: Session) -> User | None:
    stmt = select(User).where(
        and_(
            User.SMTP_USER == username,
            User.SMTP_PASSWORD == password,
            User.DATE_DELETED.is_(None)
        )
    )
    result = db.execute(stmt)
    return result.scalar_one_or_none()