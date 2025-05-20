from fastapi import FastAPI
from src.modules.auth.controller import router as auth_router
from src.modules.tracking.processes.controller import router  as process_router

def register_routes(app: FastAPI):
    app.include_router(auth_router)
    app.include_router(process_router)