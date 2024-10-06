import { Request, Response, NextFunction } from 'express';

export default async function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.message);
  res.status(500).json({ error: 'Internal server error' });
}