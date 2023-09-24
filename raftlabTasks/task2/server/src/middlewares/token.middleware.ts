import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  const verified = jwt.verify(token, process.env.SECRET_KEY);
  if (!verified) {
    return res
      .status(401)
      .json({ error: 'Invalid token or token expired.Please login again' });
  } else {
    const user = jwt.decode(token);
    req['user'] = user;
    next();
  }
}

export default verifyToken;
