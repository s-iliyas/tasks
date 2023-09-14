import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from config import settings

if os.getenv("APP_ENV") == "production":
  postgres_user = settings.prod_postgres_user
  postgres_password = settings.prod_postgres_password
  postgres_db = settings.prod_postgres_db
  postgres_port = settings.prod_postgres_port
  postgres_host = settings.prod_postgres_host
else:
  postgres_user = settings.dev_postgres_user
  postgres_password = settings.dev_postgres_password
  postgres_db = settings.dev_postgres_db
  postgres_port = settings.dev_postgres_port
  postgres_host = settings.dev_postgres_host

SQLALCHEMY_DATABASE_URL = f'postgresql://{postgres_user}:{postgres_password}@{postgres_host}:{postgres_port}/{postgres_db}'

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_session():
    session=SessionLocal()
    try:
      yield session
    except Exception as e:
      print(e.args[0])
    finally:
      session.close()

Base = declarative_base()

