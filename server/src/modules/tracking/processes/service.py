from pymysql.connections import Connection
from src.modules.tracking.processes import model
from fastapi import FastAPI, HTTPException, status
from fastapi.responses import FileResponse
from pathlib import Path

def getCapByProcessFast(process, db:Connection):
    generalDataCap = model.getGeneralDataCapFast(process, db)

    if not generalDataCap:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Processo não encontrado"
        )

    statusProcess = False
    statusTimeLine = model.getStatusTimeLine(process, db)
    occurrences = model.getOccurrences(process, db)

    generalDataCap["DOCUMENTOSANEXADOS"] = model.getAttachedDocuments(process, db)
    generalDataCap["CONTAINERS"] = model.getContainers(process, db)
    generalDataCap["TRANSBORDOSMARITIMOS"] = model.getMaritimeTranshipment(process, db)
    generalDataCap["TRANSBORDOSAEREOS"] = model.getAerialTranshipment(process, db)
    statusProcess = True

    return {
    "generalDataCap": generalDataCap,   
    "statusTimeLine": statusTimeLine,
    "occurrences": occurrences,
    "status": statusProcess
}


def getAtachedDocuments(path: str):
    BASE_DIR = Path('/home/cheetah/mmcs/atlantis_files').resolve()

    resolve_path = Path(path).resolve()

    if not str(resolve_path).startswith(str(BASE_DIR)):
        raise HTTPException(status_code=403, detail="Acesso negado.")

    if not resolve_path.exists() or not resolve_path.is_file():
        raise HTTPException(status_code=404, detail="Arquivo não encontrado.")

    suffix = resolve_path.suffix.lower()

    if suffix == ".pdf":
        return FileResponse(
            resolve_path,
            media_type="application/pdf",
            filename=resolve_path.name,
            headers={"Content-Disposition": f"inline; filename={resolve_path.name}"}
        )
    else:
        return FileResponse(
            resolve_path,
            media_type="application/octet-stream",
            filename=resolve_path.name,
            headers={"Content-Disposition": f"attachment; filename={resolve_path.name}"}
        )