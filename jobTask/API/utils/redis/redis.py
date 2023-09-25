import redis

from config import settings

async def get_redis():
    r = redis.Redis(
        host = settings.redis_host,
        port = settings.redis_port,
        password = settings.redis_password
    )
    try:
        yield r
    except Exception as e:
        print('[REDIS_ERROR] ' , e.args[0])
    finally:
        r.close()
