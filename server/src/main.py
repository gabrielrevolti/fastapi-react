from fastapi import FastAPI
from .api import register_routes
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

register_routes(app)

origins = [
  "http://localhost:5173"
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)

