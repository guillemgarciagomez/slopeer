import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default (req: Request, _: Response, next: NextFunction): void => {
  const token = req.headers.authorization;
  if (token && process.env.JWTPrivateKey) {
    const _id = jwt.verify(token, process.env.JWTPrivateKey);
    req.body._id = _id;
  }
  next();
};


