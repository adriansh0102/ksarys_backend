import jwt from 'jsonwebtoken';

import { Request, Response, NextFunction } from 'express';
import { sendRes } from './send.res';

export async function checkAuth(req: Request, res: CustomResponse, next: NextFunction) {

  
  try {
    const token: string = req.headers['access-token'] as string;
    if (!token) return sendRes(res, 500, false, 'Ha ocurrido algo grave', '');

    const decoded = jwt.verify(token, process.env!.JWT_KEY_APP!) as { user_id: string , entity : string };
    res.userData = { id: decoded.user_id };
    res.entity = decoded.entity;
    return next();
  } catch (error) {
    return sendRes(res, 500, false, 'Ha ocurrido algo grave', error);
  }
}

export interface CustomResponse extends Response {
  userData?: {id: string};
  entity?: string;
}

declare global {
  namespace Express {
    interface Response {
      userData?: {id: string};
    }
  }
}