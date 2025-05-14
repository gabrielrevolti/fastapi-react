from fastapi import FastAPI
from .database.core import engine, Base
from .api import register_routes

app = FastAPI()

