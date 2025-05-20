from pymysql.connections import Connection
from src.modules.tracking.processes import model

def getCapByProcessFast(process, db:Connection):
    statusTimeLine = model.getStatusData(process, db)
    generalDataCap = model.getGeneralDataCapFast(process, db)
    return {
    "statusTimeLine": statusTimeLine,
    "generalDataCap": generalDataCap
}
