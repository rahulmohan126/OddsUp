import { Request, Response, NextFunction } from 'express';
import { supabase } from "../util/db";
import { getInfo } from '../services/user';

export default async function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const idToken = authHeader.split(" ")[1];

  const { data, error } = await supabase.auth.getUser(idToken);

  if (error) {
    console.log(error);
    return res.sendStatus(403);
  }

  res.locals.userId = data.user.id;
  res.locals.userRef = await getInfo(data.user.id);
  return next();
}