from src.database.core import DbConnection

def getStatusTimeLine(process, db: DbConnection):
    sql = """
        SELECT 
            DATE_CREATION,
            IS_CONFIRMED_OUTPUT,
            FORECASTS_OUTPUT,
            FORECASTS_ARRIVAL,
            IS_CONFIRMED_ARRIVAL 
		from M0020_SHIPMENT_HOUSE 
		where SHIPMENT_NUMBER = %s OR HOUSE_NUMBER = %s OR  RESERVED_NUMBER = %s;
    """
    with db.cursor() as cursor:
        cursor.execute(sql, (process, process, process))
        return cursor.fetchone()


def getOccurrences(process, db: DbConnection):
    sql = """
        SELECT 
            CAST("99" AS INT) AS ORDEM,
            OCCURRENCE AS DESCRICAO,
            OCCURRENCE_DATE AS DATA
        FROM M0020_SHIPMENT_OCCURRENCES 
        WHERE HOUSE_FK = (
            SELECT SH.ID FROM M0020_SHIPMENT_HOUSE SH
            WHERE SH.SHIPMENT_NUMBER = %s OR SH.HOUSE_NUMBER = %s OR SH.RESERVED_NUMBER = %s
            LIMIT 1
        )

        UNION ALL

        SELECT 
            ORDER_NUMBER AS ORDEM,
            DESCRIPTION AS DESCRICAO,
            IF(DATE_STATUS IS NOT NULL,DATE_STATUS,SUBSTRING(INFORMATION,1,10)) AS DATA
        FROM M0020_SHIPMENT_STATUS 
        WHERE HOUSE_FK = (
            SELECT SH.ID FROM M0020_SHIPMENT_HOUSE SH
            WHERE SH.SHIPMENT_NUMBER = %s OR SH.HOUSE_NUMBER = %s OR SH.RESERVED_NUMBER = %s
            LIMIT 1
        )

        ORDER BY DATA DESC, ORDEM ASC;
    """
    
    with db.cursor() as cursor:
        cursor.execute(sql, (process, process, process, process, process, process))
        return cursor.fetchall()

def getGeneralDataCapFast(process, db: DbConnection):
    sql = """
        SELECT
            SH.SHIPMENT_NUMBER AS PROCESSO,
            SH.TRAVEL_NUMBER AS PRIMEIRAVIAGEM,
            CGC.NAME_CG AS CLIENTE,
            CGS.NAME_CG AS SHIPPER,
            CGCON.NAME_CG AS CNEE,
            CGA.NAME_CG AS AGENTE,
            SH.SHIPMENT_TYPE,
            IF(MPO.NAME_PORT IS NULL, CTO.NAME_CITY, MPO.NAME_PORT) AS ORIGIN,
            IF(MPD.NAME_PORT IS NULL, CTD.NAME_CITY, MPD.NAME_PORT) AS DESTINATION,
            CGC.FEDERAL_REGISTRATION AS CNPJ,
            IF(SH.SHIPMENT_MODAL LIKE 'CM%%', MPFD.NAME_PORT, "") AS FINAL_DESTINATION,
            DATE_FORMAT(SH.DATE_CREATION, '%%d/%%m/%%Y') AS CRIACAOEMBARQUE, 
            DATE_FORMAT(SH.FORECASTS_OUTPUT, '%%d/%%m/%%Y') AS ETD,
            DATE_FORMAT(SH.FORECASTS_ARRIVAL, '%%d/%%m/%%Y') AS ETA, 
            IF(SH.SHIPMENT_MODAL LIKE 'CM%%', DATE_FORMAT(SH.FORECAST_ARRIVAL_FINAL, '%%d/%%m/%%Y'), "") AS FINAL_ETA,
            IF(SH.SHIPMENT_MODAL LIKE 'CA%%' OR SH.SHIPMENT_TYPE LIKE 'DIRECT', CONCAT(CCAR.COD_NUMERIC, "-", SH.MASTER_NUMBER), "") AS MASTER,  
            IF(SH.SHIPMENT_TYPE = 'DIRECT', SH.MASTER_NUMBER, SH.HOUSE_NUMBER) AS HOUSE, 
            IF(SH.SHIPMENT_MODAL LIKE 'CM%%', SH.RESERVED_NUMBER, '') AS BOOKING, 
            CCAR.NAME_CG AS CARRIER, 
            IF(SH.SHIPMENT_MODAL LIKE 'CM%%', SHIP.NAME, " ") AS NAVIO,
            SH.TRAVEL_NUMBER AS VIAGEM,
            SH.REF_CLIENT AS REF_CLIENT,
            SH.COMMODITY_DESCRIPTION AS MERCADORIA,
            SH.VOLUME_QUANTITY AS VOLUMES, 
            SH.CUBED_WEIGHT AS M3, 
            SH.WEIGHT_TO_CHARGE AS PESO_COBRAR, 
            SH.BRUTE_WEIGHT AS PESO_BRUTO, 
            SH.TOTAL_CNTR AS CONTAINERS, 
            INC.CODE AS INCOTERM
        FROM M0020_SHIPMENT_HOUSE SH
        LEFT JOIN M0130_CONTACT_GENERAL CGC ON CGC.ID = SH.CLIENT_CONTACT_GENERAL_FK 
        LEFT JOIN M0130_CONTACT_GENERAL CGS ON CGS.ID = SH.SHIPPER_CONTACT_GENERAL_FK 
        LEFT JOIN M0130_CONTACT_GENERAL CGA ON CGA.ID = SH.AGENT_CONTACT_GENERAL_FK 
        LEFT JOIN M0130_CONTACT_GENERAL CGCON ON CGCON.ID = SH.CNEE_CONTACT_GENERAL_FK 
        LEFT JOIN M0130_CONTACT_GENERAL CCAR ON CCAR.ID = SH.CARRIER_CONTACT_GENERAL_FK 
        LEFT JOIN M0105_MAPORT MPO ON MPO.ID = SH.ORIGIN_MAPORT_FK 
        LEFT JOIN M0105_MAPORT MPD ON MPD.ID = SH.DESTINY_MAPORT_FK 
        LEFT JOIN M0001_CITY CTO ON CTO.ID = SH.CITY_ORIGIN_FK
        LEFT JOIN M0001_CITY CTD ON CTD.ID = SH.CITY_DESTINATION_FK
        LEFT JOIN M0105_MAPORT MPFD ON MPFD.ID = SH.FINAL_DESTINATION 
        LEFT JOIN M0107_INCOTERM INC ON INC.ID = SH.INCOTERM_FK 
        LEFT JOIN M0401_SHIP SHIP ON SHIP.ID = SH.SHIP_FK 
        WHERE SH.SHIPMENT_NUMBER = %s OR SH.HOUSE_NUMBER = %s OR SH.RESERVED_NUMBER = %s
        LIMIT 1;
        """
    
    with db.cursor() as cursor:
        cursor.execute(sql, (process, process, process))
        return cursor.fetchone()
    

def getAttachedDocuments(process, db: DbConnection):
    sql = """
        SELECT
            SAF.COMMENTS AS 'NOME',
            SAF.FILENAME AS 'ARQUIVO',
            SAF.PATH AS 'PATH'
        FROM M0020_SHIPMENT_ATTACHMENT_FILE SAF
        INNER JOIN M0020_SHIPMENT_HOUSE SH ON SH.ID = SAF.HOUSE_FK
        WHERE SAF.IS_SHOW_IN_TRACKING = TRUE 
        AND (SH.SHIPMENT_NUMBER = %s OR SH.HOUSE_NUMBER = %s OR  SH.RESERVED_NUMBER = %s)
    """

    with db.cursor() as cursor:
        cursor.execute(sql, (process, process, process))
        return cursor.fetchall()

def getContainers(process, db: DbConnection):
    sql = """
        SELECT
        CT.CODE AS 'TIPO',
        SC.CONTAINER_NUMBER AS 'CONTAINER',
        SC.NET_WEIGHT AS 'NET_WEIGHT'
        FROM M0020_SHIPMENT_CONTAINER SC
        INNER JOIN M0108_CONTAINER_TYPE CT ON CT.ID = SC.CONTAINER_TYPE_FK
        INNER JOIN M0020_SHIPMENT_HOUSE SH ON SH.ID = SC.HOUSE_FK  
        WHERE SH.SHIPMENT_NUMBER = %s OR SH.HOUSE_NUMBER = %s OR  SH.RESERVED_NUMBER = %s
    """

    with db.cursor() as cursor:
        cursor.execute(sql, (process, process, process))
        return cursor.fetchall()


def getMaritimeTranshipment(process, db: DbConnection):
    sql = """
        SELECT
            MPT.NAME_PORT AS 'PORTO',
            CONCAT(SHIP.NAME, ' - ',TR.TRAVEL_NUMBER) AS 'NAVIO', TR.DATE_FINISH AS 'ETA', TR.DATE_OUT AS 'ETA'
        FROM M0020_TRANSHIPMENT TR
        INNER JOIN M0105_MAPORT MPT ON MPT.ID = TR.PORT_FK 
        LEFT JOIN M0401_SHIP SHIP ON SHIP.ID = TR.SHIP_FK 
        INNER JOIN M0020_SHIPMENT_HOUSE SH ON SH.ID = TR.HOUSE_FK
        WHERE SH.SHIPMENT_NUMBER = %s OR SH.HOUSE_NUMBER = %s OR  SH.RESERVED_NUMBER = %s
    """

    with db.cursor() as cursor:
        cursor.execute(sql, (process, process, process))
        return cursor.fetchone()

def getAerialTranshipment(process, db: DbConnection):
    sql = """
        SELECT
            MPT.NAME_PORT AS 'PORTO',
            TR.DATE_OUT AS 'ETA'
        FROM M0020_TRANSHIPMENT TR
        INNER JOIN M0105_MAPORT MPT ON MPT.ID = TR.PORT_FK 
        INNER JOIN M0020_SHIPMENT_HOUSE SH ON SH.ID = TR.HOUSE_FK
        WHERE SH.SHIPMENT_NUMBER = %s OR SH.HOUSE_NUMBER = %s OR  SH.RESERVED_NUMBER = %s
    """

    with db.cursor() as cursor:
        cursor.execute(sql, (process, process, process))
        return cursor.fetchone()