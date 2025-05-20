from fastapi import APIRouter, Depends
from typing import Annotated
from src.database.core import DbConnection
from src.modules.tracking.processes import service

router = APIRouter(prefix="/process", tags=["process"])

@router.get("/cap-fast/{process}")
def get_cap_by_process(process, db: DbConnection):
    return service.getCapByProcessFast(process, db)
