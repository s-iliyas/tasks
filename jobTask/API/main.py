import os
import json
from redis import Redis
from sqlalchemy.orm import Session
from fastapi import Depends, Response, FastAPI, Request

from web.v1 import v1Data as getData1
from web.v2 import v2Data as getData2
from web.login import login

from models.user import User
from utils.redis.redis import get_redis
from utils.db.database import get_session
from utils.db.database import Base, engine
from models.schemas.user_model import UpdateName

server = FastAPI()

Base.metadata.create_all(engine)

server.include_router(getData1.router, prefix = "/v1")
server.include_router(getData2.router, prefix = "/v2")
server.include_router(login.router, prefix = "/login")

@server.get("/")
def home():
    return {"message": f"{'Production' if os.getenv('APP_ENV')=='production' else 'Development'} API Working..."}

@server.post("/setName")
async def updateName(req:Request, data: UpdateName, session: Session = Depends(get_session), redis: Redis = Depends(get_redis)):
    try:
        token = req.headers.get("authorization")
        if not token:
            return Response(json.dumps({ "message" : "Unauthorized" }), status_code = 401)
        username = redis.get(token.replace("Bearer","").strip())
        if not username:
            return Response(json.dumps({ "message" : "Please login" }), status_code = 400)
        if not data.name:
            return Response(json.dumps({ "message" : "Name is required" }), status_code = 400)
        session.query(User).filter(User.username == username.decode('utf-8')).update({ "name" : data.name }, synchronize_session = 'evaluate')
        session.commit()
        return Response(json.dumps({ "message" : "Name updated." }),status_code=200)
    except Exception as e:
        return Response(json.dumps({ "error" : e.args[0] }), status_code = 400)

@server.get("/getName")
async def getName(req:Request, session: Session = Depends(get_session), redis: Redis = Depends(get_redis)):
    try:
        token = req.headers.get("authorization")
        if not token:
            return Response(json.dumps({ "message" : "Unauthorized" }), status_code = 401)
        username = redis.get(token.replace("Bearer","").strip())
        if not username:
            return Response(json.dumps({ "message" : "Please login" }), status_code = 400)
        user = session.query(User).filter(User.username == username.decode('utf-8')).first()
        return Response(json.dumps({ "name" : user.name }),status_code=200)
    except Exception as e:
        return Response(json.dumps({ "error" : e.args[0] }), status_code = 400)