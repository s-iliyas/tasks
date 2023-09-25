from sqlalchemy import Column, Integer, String, Boolean

from utils.db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    name = Column(String, nullable=True)
    hashed_password = Column(String)

