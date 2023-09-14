import os
from pydantic_settings import BaseSettings,SettingsConfigDict

class Settings(BaseSettings):
    app_name: str
    admin_email: str

    redis_host: str
    redis_port: str
    redis_password: str

    fakedata_url_v1: str
    fakedata_url_v2: str

    if os.getenv("APP_ENV") == "production":
        env_file: str = ".env.prod"
        prod_postgres_db: str
        prod_postgres_user: str
        prod_postgres_password: str
        prod_postgres_host: str
        prod_postgres_port: int
    else:
        dev_postgres_db: str
        dev_postgres_user: str
        dev_postgres_password: str
        dev_postgres_host: str
        dev_postgres_port: int
        env_file: str = ".env.dev"

    model_config = SettingsConfigDict(env_file=env_file)

settings = Settings()
