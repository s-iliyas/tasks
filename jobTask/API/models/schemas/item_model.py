from pydantic import BaseModel

class ItemBaseV1(BaseModel):
    title: str
    description: str


class ItemBaseV2(BaseModel):
    title: str
    price: float