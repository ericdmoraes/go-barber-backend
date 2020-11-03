// modules
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

// Errors
import AppError from '../errors/app.error';

// configs
import auth from '../config/auth.config';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): NextFunction | void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token not provided!', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, auth.jwt.secret);

    const { sub } = decoded as TokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
