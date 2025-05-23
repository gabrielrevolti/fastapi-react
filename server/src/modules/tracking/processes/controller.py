from fastapi import APIRouter, Depends
from typing import Annotated
from src.database.core import DbConnection
from src.modules.tracking.processes import service

router = APIRouter(prefix="/process", tags=["process"])

@router.get("/cap-fast/{process}")
def getCapByProcess(process, db: DbConnection):
    return service.getCapByProcessFast(process, db)

@router.get("/documents")
def openDocument(path: str):
    return service.getAtachedDocuments(path)
