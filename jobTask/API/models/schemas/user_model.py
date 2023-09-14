from pydantic import BaseModel

class Login(BaseModel):
    username: str
    password: str

class UpdateName(BaseModel):
    name: str