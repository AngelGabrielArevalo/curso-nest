-- CREATE DATABASE IF NOT EXISTS tareas
SELECT
    'CREATE DATABASE tareas'
WHERE
    NOT EXISTS (
        SELECT
        FROM
            pg_database
        WHERE
            datname = 'tareas'
    ) \ gexec