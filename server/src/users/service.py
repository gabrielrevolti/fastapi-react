from src.database.core import DbConnection

def get_login_user(email: str, password: str, db: DbConnection) -> dict | None:
    sql = """
        SELECT
            smtp_user AS 'USER',
            smtp_password AS 'PASS'
        FROM M0003_USER
        WHERE smtp_user LIKE %s
          AND smtp_password = %s
          AND date_deleted IS NULL
        LIMIT 1
    """
    with db.cursor() as cursor:
        cursor.execute(sql, (email, password))
        return cursor.fetchone()
