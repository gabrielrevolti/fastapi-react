from pymysql.connections import Connection
from src.modules.tracking.processes import model

def getCapByProcessFast(process, db:Connection):
    generalDataCap = model.getGeneralDataCapFast(process, db)
    statusTimeLine = model.getStatusTimeLine(process, db)
    occurrences = model.getOccurrences(process, db)
    return {
    "generalDataCap": generalDataCap,   
    "statusTimeLine": statusTimeLine,
    "occurrences": occurrences
}
