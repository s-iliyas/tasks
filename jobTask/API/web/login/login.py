import uuid
import json
import bcrypt
from redis import Redis
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, Response

from models.user import User
from utils.redis.redis import get_redis
from utils.db.database import get_session
from models.schemas.user_model import Login

router = APIRouter()

@router.post("")
async def user_login(data: Login, session: Session = Depends(get_session), redis: Redis = Depends(get_redis)):
    try:
        if not hasattr(data, "username"):
            return Response(json.dumps({ "message" : "Username is required" }), status_code = 400)

        if not hasattr(data, "password"):
            return Response(json.dumps({ "message" : "Password is required" }), status_code = 400)

        user = session.query(User).filter(User.username==data.username).first()
        if not user:
            hashed_password=bcrypt.hashpw(data.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            user = User(username = data.username, hashed_password = hashed_password)
            uniqueId = uuid.uuid4()
            session.add(user)
            session.commit()
            session.refresh(user)
            redis.set(str(uniqueId), user.username)
            return Response(json.dumps({ "message" : "User logged in" }), status_code = 200, headers = {'Authorization': f'Bearer {uniqueId}'})
        else:
            encode_password=data.password.encode('utf-8')
            decrpyt_password=bcrypt.checkpw(encode_password, user.hashed_password.encode('utf-8'))
            if decrpyt_password:
                uniqueId = uuid.uuid4()
                redis.set(str(uniqueId), user.username)
                return Response(json.dumps({ "message" : "User logged in" }), status_code = 200, headers = {'Authorization': f'Bearer {uniqueId}'})
            else:
                return Response(json.dumps({ "message" : "Invalid password or User already exists." }), status_code = 400)
    except Exception as e:
            return Response(json.dumps({ "error" : e.args[0] }), status_code = 400)



