from sqlalchemy import Column, Integer, String, Float

from utils.db.database import Base

class ItemV1(Base):
    __tablename__ = "v1Items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)


class ItemV2(Base):
    __tablename__ = "v2Items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    price = Column(Float, nullable=True)