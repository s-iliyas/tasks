import requests
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from config import settings
from models.item import ItemV1
from utils.db.database import get_session
from models.schemas.item_model import ItemBaseV1

router = APIRouter()

@router.get("/")
def getV1():
    return {"message":"V1 API Working.."}

@router.get("/hello")
def getV1TestData():
    items = requests.get(settings.fakedata_url_v1).json()
    return { "todos" : items}

@router.get("/items")
def getV1Data(session: Session= Depends(get_session)):
    items = session.query(ItemV1).all()
    return { "items" : items}

@router.post("/items")
def addV1Items(data: ItemBaseV1,session: Session = Depends(get_session)):
    item = ItemV1(title = data.title, description = data.description)
    session.add(item)
    session.commit()
    session.refresh(item)
    return { "item" : item}