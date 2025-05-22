from pymysql.connections import Connection
from src.modules.tracking.processes import model

def getCapByProcessFast(process, db:Connection):
    generalDataCap = model.getGeneralDataCapFast(process, db)
    statusTimeLine = model.getStatusTimeLine(process, db)
    occurrences = model.getOccurrences(process, db)

    status = False

    if generalDataCap:
        generalDataCap["DOCUMENTOSANEXADOS"] = model.getAttachedDocuments(process, db)
        generalDataCap["CONTAINERS"] = model.getContainers(process, db)
        generalDataCap["TRANSBORDOSMARITIMOS"] = model.getMaritimeTranshipment(process, db)
        generalDataCap["TRANSBORDOSAEREOS"] = model.getAerialTranshipment(process, db)
        status = True

    return {
    "generalDataCap": generalDataCap,   
    "statusTimeLine": statusTimeLine,
    "occurrences": occurrences,
    "status": status
}
