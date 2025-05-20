from src.database.core import DbConnection
from src.modules.users import schema as schema_user

def get_login_user(smtp_email: str, smtp_password: str, db: DbConnection) -> schema_user.UserLogin | None:
    sql = """
        SELECT
            smtp_user,
            smtp_password
        FROM M0003_USER
        WHERE smtp_user LIKE %s
          AND smtp_password = %s
          AND date_deleted IS NULL
        LIMIT 1
    """
    with db.cursor() as cursor:
        cursor.execute(sql, (smtp_email, smtp_password))
        result = cursor.fetchone()
        if result:
            return schema_user.UserLogin(**result)
        return None
    
def getUserByEmail(smtp_email: str, db:DbConnection) -> schema_user.UserEmail | None:
    sql = """SELECT * FROM M0003_USER WHEWE USERNAME = %s"""
    with db.cursor() as cursor:
        cursor.execute(sql, (smtp_email))
        result = cursor.fetchone()
        if result:
            return schema_user.UserEmail(**result)
        return None

def getUsersPerUser(id): 
    sql = """
        SELECT
			UTC.CONTACT_GENERAL_ID AS 'CLIENTES'
			FROM M0003_USER_TRACKING_CG UTC
			WHERE UTC.USER_FK = %s
    """

