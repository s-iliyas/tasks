import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      context: {
        token: string;
      };
    }
  }
}

const tokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.headers.authorization || "";
  req.context = { token };
  next();
};

export default tokenMiddleware;
