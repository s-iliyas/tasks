import requests
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends

from config import settings
from models.item import ItemV2
from utils.db.database import get_session
from models.schemas.item_model import ItemBaseV2

router = APIRouter()

@router.get("/")
def getV2():
    return {"message":"V2 API Working.."}

@router.get("/hello")
def getV2TestData():
    items = requests.get(settings.fakedata_url_v2).json()
    return { "comments" : items}

@router.get("/items")
def getV2Data(session: Session = Depends(get_session)):
    items = session.query(ItemV2).all()
    return { "items" : items}

@router.post("/items")
def addV2Items(data: ItemBaseV2,session: Session = Depends(get_session)):
    item = ItemV2(title = data.title, price = data.price)
    session.add(item)
    session.commit()
    session.refresh(item)
    return { "item" : item}