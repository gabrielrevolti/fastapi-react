import pymysql
from typing import Annotated
from typing import Generator
import os
from fastapi import Depends
from dotenv import load_dotenv

load_dotenv()

def get_connection() -> pymysql.connections.Connection:
    return pymysql.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USERNAME"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_DATABASE"),
        port=int(os.getenv("DB_PORT")),
        cursorclass=pymysql.cursors.DictCursor
    )


def get_db() -> Generator[pymysql.connections.Connection, None, None]:
    db = get_connection()
    try:
        yield db
    finally:
        db.close()
        
DbConnection = Annotated[pymysql.connections.Connection, Depends(get_db)]
