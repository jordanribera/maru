#!/bin/sh

set -e

python << END
import os
import psycopg2
import time
MARU_DATABASE = os.environ.get('MARU_DATABASE', 'sqlite')
INTERVAL = os.environ.get('DB_INTERVAL', 1)
RETRIES = os.environ.get('DB_RETRIES', 30)
POSTGRES_HOST = os.environ.get('POSTGRES_HOST', '')
POSTGRES_PORT=os.environ.get('POSTGRES_PORT', 5432)
POSTGRES_DB=os.environ.get('POSTGRES_DB', '')
POSTGRES_USER=os.environ.get('POSTGRES_USER', '')
POSTGRES_PASSWORD=os.environ.get('POSTGRES_PASSWORD', '')
def postgres_ready():
    try:
        connection = psycopg2.connect(
            host=POSTGRES_HOST,
            port=POSTGRES_PORT,
            user=POSTGRES_USER,
            password=POSTGRES_PASSWORD,
            dbname=POSTGRES_DB,
        )
        connection.close()
        return True
    except:
        return False

if MARU_DATABASE is 'postgres':
    attempts = 0
    while attempts < RETRIES:
        if postgres_ready():
            print('postgres is ready')
            exit()
        else:
            attempts += 1
            print('...')
            time.sleep(INTERVAL)
END

exec "$@"
